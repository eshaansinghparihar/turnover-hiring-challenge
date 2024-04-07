/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
import React,{useState} from 'react';
import Link from 'next/link';
import Header from '~/components/Header';
import { api } from "~/utils/api"
import router from 'next/router';
const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const data = api.auth.signup.useMutation();
  const otp =  api.otp.generateOTPProcedure.useMutation()
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const saveUser = async () => {
    const { email, password, username } = formData;
    try {
       await data.mutate({ email, password, username });
      setFormData({
        username: "",
        email: "",
        password: ""
      });

      // Simulate a delayed database call
      setTimeout(async () => {
      await sendOTP(email).catch(error=>console.error("Error while sending OTP: ",error)); // Send OTP after 10 seconds delay
      // Navigate to verifyEmail page with email query parameter
      router.push({
      pathname: '/verifyEmail',
      query: { email }
      });
      }, 10000);
      } catch (error) {
      // Handle error if needed
      console.error("Error while signing up:", error);
      }

  }
  
  const sendOTP = async (email: string) => {
    try {
      await otp.mutate({ email });
    } catch (error) {
      console.log("Error while sending OTP:", error)
    }
  }
  
  return (
    <Header>
      <main>
        <div className="w-2/5 mx-auto border border-gray-300 rounded-xl p-8 mt-4">
          <h2 className="text-xl font-medium mb-4 text-center tracking-wide">
            Create your account
          </h2>
          <div className="flex flex-col space-y-4 text-xs">
            <div>
              <label
                htmlFor="name"
                className="block font-thin tracking-wide text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="username"
                value={formData.username}
                placeholder="Enter"
                className="w-full border border-gray-200 rounded px-3 py-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-thin tracking-wide text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Enter"
                className="w-full border border-gray-200 rounded px-3 py-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-thin tracking-wide text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                placeholder="Enter"
                className="w-full border border-gray-200 rounded px-3 py-2"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
          className="w-full bg-black text-white font-light tracking-widest text-xs px-6 py-4 rounded uppercase mt-6 mx-auto block hover:bg-gray-800"
          type="submit"
          onClick={async (e) => {
          e.preventDefault();
          await saveUser();
          await sendOTP(formData.email);
          }}
>
  Create Account
</button>
          <p className="text-xs mt-4 text-center text-gray-700">
            Have an Account ?
            <span className="font-light cursor-pointer uppercase tracking-widest hover:underline font-semibold">
              <Link href="/login">login</Link>
            </span>
          </p>
        </div>
      </main>
    </Header>
  );
};

export default SignupForm;

