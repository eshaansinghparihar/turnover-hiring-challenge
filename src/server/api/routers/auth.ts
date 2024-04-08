/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hashPassword, verifyPassword } from "../utils";
import jwt from 'jsonwebtoken';

// Define a secret key for signing JWT tokens
const JWT_SECRET:string = process.env.JWT_SECRET!

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Hash the password before storing it
      const hashedPassword = await hashPassword(input.password);

      const user = await ctx.db.user.create({
        data: {
          username: input.username,
          email: input.email,
          password: hashedPassword,
          isAuthenticated: false,
        },
      });

      if(!user) throw new Error("Signup Failed")

      // Generate a token upon successful signup
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      return { success: "User created successfully", user, token };
    }),
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const passwordValid = await verifyPassword(input.password, user.password);

      if (!passwordValid) {
        throw new Error("Invalid email or password");
      }

      // Generate a token upon successful login
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      return { success: "Login successful", user, token };
    }),
});
