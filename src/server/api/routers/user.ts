/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserDataByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { email } = input;
      
      const user = await ctx.db.user.findUnique({ where: { email } });
      
      if (!user) {
        throw new Error("User not found");
      }
      
      return user;
    }),
});
