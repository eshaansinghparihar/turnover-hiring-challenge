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

      // Optional: Store OTP in database for verification
      //   if (yourAppUsesSeparateOTPTable) {
      //     await ctx.db.otp.create({
      //       data: {
      //         userId: user.id,
      //         code: otpCode,
      //         expiry: new Date(Date.now() + 5 * 60 * 1000), // Expiry in 5 minutes (adjust as needed)
      //       },
      //     });
      //   }

      await sendEmail(input.email, otpCode);

      return { message: "OTP sent successfully" };
    }),
});
