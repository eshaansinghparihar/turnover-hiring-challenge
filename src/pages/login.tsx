/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Link from 'next/link';
import Header from '~/components/Header';
import Head from "next/head";

const LoginForm = ({onLogin}) => {
  return (
    <Head>
        <Header>
            <main>
            <div className="w-2/5 mx-auto border border-gray-300 rounded-xl p-8 mt-4">
      <p className="text-xl font-medium mb-4 text-center tracking-widest">Login</p>
      <p className="text-sm font-light text-center mb-4 tracking-wide">Welcome back to ECOMMERCE</p>
      <p className="text-xs mb-2 font-extralight text-center tracking-wide">The next gen business marketplace</p>
      <div>
        <label htmlFor="email" className="block font-thin tracking-wide text-gray-700 text-xs mb-2">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter"
          className="w-full border border-gray-200 rounded px-3 py-2 text-xs mb-2"
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="block font-thin tracking-wide text-gray-700 text-xs mb-2">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter"
          className="w-full border border-gray-200 rounded px-3 py-2 pr-10 text-xs mb-2"
        />
        <span className="absolute mt-2 inset-y-0 right-0 flex items-center pr-3 text-xs font-thin text-black-500 cursor-pointer underline">Show</span>
      </div>
      <button onClick={onLogin} 
      className="w-full bg-black text-white font-light tracking-widest text-xs px-6 py-4 rounded uppercase mt-6 mx-auto block hover:bg-gray-800">Login</button>
      <hr className="mt-6 mb-2 border-gray-400" />
    <div className="flex justify-center">
    <p className="text-xs mt-4 text-center text-gray-700">Don`t have an Account? <span className="font-light cursor-pointer uppercase tracking-widest hover:underline font-semibold"><Link href='/signup'>sign up</Link></span></p>
    </div>
    </div>
            </main>
        </Header>
    </Head>
  );
};

export default LoginForm;
