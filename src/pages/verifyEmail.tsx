/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React, { useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Header from "~/components/Header";

const VerifyEmail = () => {
  const [inputOTP, setInputOTP] = useState("");
  const router = useRouter();
  const email = router.query.email as string;
  const otp = api.otp.verifyInputOTP.useMutation();

  const verifyOTP = async () => {
    try {
      await otp.mutate({ email, otp: inputOTP });
      // If OTP verification is successful, route to '/'
      router.push("/login");
    } catch (error) {
      // Handle error if OTP verification fails
      console.error("Error verifying OTP:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 1) {
      const updatedOTP = inputOTP.slice(0, index) + inputValue + inputOTP.slice(index + 1);
      setInputOTP(updatedOTP);
    }
  };

  return (
    <div>
      <Header>
        <div className="w-2/5 mx-auto border border-gray-300 rounded-xl p-8 mt-4">
          <h2 className="text-xl font-medium mb-4 text-center tracking-wide">
            Verify your email
          </h2>
          <p className="text-xs mb-2 font-extralight text-center tracking-wide">Enter the 8 digit code you have received on</p>
          <p className="text-xs mb-2 font-extralight text-center tracking-wide">{email}</p>
          <div className="flex flex-col items-center">
            <label htmlFor="otp" className="block font-medium tracking-wide text-sm mb-2 justify-start">Code</label>
            <div className="flex justify-center">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <input
                  key={index}
                  type="text"
                  value={inputOTP[index] ?? ""}
                  onChange={(e) => handleInputChange(e, index)}
                  maxLength={1}
                  className="w-full h-8 text-center border border-gray-300 rounded mr-2"
                />
              ))}
            </div>
          </div>
          <button
            onClick={verifyOTP}
            className="w-full bg-black text-white font-light tracking-widest text-xs px-6 py-4 rounded uppercase mt-6 mx-auto block hover:bg-gray-800"
          >
            Verify
          </button>
        </div>
      </Header>
    </div>
  );
};

export default VerifyEmail;
