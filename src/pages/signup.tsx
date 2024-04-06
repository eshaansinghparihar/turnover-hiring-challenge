import React,{useState} from 'react';
import Link from 'next/link';
import Header from '~/components/Header';
import { api } from "~/utils/api"

const SignupForm = () => {
    const[username,setUserName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const  data  = api.auth.signup.useMutation();
    const saveUser=()=>{
      data.mutate({ email, password, username });
      setUserName("");
      setEmail("");
      setPassword("");
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
                  value={username}
                  placeholder="Enter"
                  className="w-full border border-gray-200 rounded px-3 py-2"
                  onChange={(e) => setUserName(e.target.value)}
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
                  value={email}
                  placeholder="Enter"
                  className="w-full border border-gray-200 rounded px-3 py-2"
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter"
                  value={password}
                  className="w-full border border-gray-200 rounded px-3 py-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              className="w-full bg-black text-white font-light tracking-widest text-xs px-6 py-4 rounded uppercase mt-6 mx-auto block hover:bg-gray-800"
              type="submit"
              onClick={(e)=>{ e.preventDefault(); saveUser();}}
            >
              Create Account
            </button>
            <p className="text-xs mt-4 text-center text-gray-700">
              Have an Account ?{" "}
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

