import React from 'react';

const SignupForm = () => {
  return (
    <div className="w-2/5 mx-auto border border-gray-300 rounded-xl p-8 mt-4">
      <h2 className="text-xl font-medium mb-4 text-center tracking-wide">Create your account</h2>
      <div className="flex flex-col space-y-4 text-xs">
        <div>
          <label htmlFor="name" className="block font-thin tracking-wide text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter"
            className="w-full border border-gray-200 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-thin tracking-wide text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter"
            className="w-full border border-gray-200 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-thin tracking-wide text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter"
            className="w-full border border-gray-200 rounded px-3 py-2"
          />
        </div>
      </div>
      <button className="w-full bg-black text-white font-light tracking-widest text-xs px-6 py-4 rounded uppercase mt-6 mx-auto block hover:bg-gray-800">Create Account</button>
      <p className="text-xs mt-4 text-center text-gray-700">Have an Account ? <span className="font-light cursor-pointer uppercase tracking-widest hover:underline font-semibold">login</span></p>
    </div>
  );
};

export default SignupForm;

