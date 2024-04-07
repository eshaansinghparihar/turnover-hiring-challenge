/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const VerifyEmail = () => {
  const [inputOtp, setOTP] = useState("");
  const router = useRouter();
  const email = router.query.email as string;
  const otp =  api.otp.verifyInputOTP.useMutation()

  const verifyOTP = async () => {
    try {
      await otp.mutate({ email, otp : inputOtp });
      // If OTP verification is successful, route to '/'
      router.push("/");
    } catch (error) {
      // Handle error if OTP verification fails
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <h1>Verify Email</h1>
      <p>Enter OTP sent to {email}</p>
      <input
        type="text"
        value={inputOtp}
        onChange={(e) => setOTP(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={verifyOTP}>Verify OTP</button>
    </div>
  );
};

export default VerifyEmail;

