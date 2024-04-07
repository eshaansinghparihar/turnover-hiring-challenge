import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// @ts-expect-error nanana
import { hashPassword ,verifyPassword} from "../utils.ts";

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

      // Generate a token or handle user login here
      return { message: "User created successfully", user };
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

    // Generate a token or handle user login here
    return { message: "Login successful" ,user};
  }),
 


});
