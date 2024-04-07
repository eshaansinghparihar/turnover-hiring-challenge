import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// @ts-expect-error nanana
import { generateOTP,sendEmail} from "../utils.ts";
export const otpRouter = createTRPCRouter({
    generateOTPProcedure: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) throw new Error("Email not found");

      const otpCode = generateOTP()

      // Update the User's OTP field with the generated OTP
      await ctx.db.user.update({
        where: { email: input.email },
        data: {
          otp: otpCode
        }
      });      
      

      await sendEmail(input.email, otpCode);

      return { message: "OTP sent successfully" };
    }),
    
    verifyInputOTP: publicProcedure
    .input(z.object({ email: z.string().email(), otp: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Find the user by email
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      // If user doesn't exist, throw an error
      if (!user) throw new Error("User not found");

      // If OTPs don't match, throw an error
      if (user.otp !== input.otp) throw new Error("Invalid OTP");

      // Update the user's isAuthenticated field to true
      await ctx.db.user.update({
        where: { email: input.email },
        data: { isAuthenticated: true },
      });

      // Return a success message
      return { message: "OTP verification successful" };
    }),
});
