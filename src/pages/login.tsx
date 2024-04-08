/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api'
import Header from '~/components/Header';
import Link from 'next/link'

const LoginForm = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword]=useState(false)
  const [pageError, setPageError] = useState('');
  const router = useRouter();
  const login = api.auth.login.useMutation();

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    console.log(showPassword)
    setShowPassword(!showPassword); 
  };

  const handleLogin = async () => {
    setPageError('')
    try {
      const { user } = await login.mutateAsync(formData);

      if (user.isAuthenticated) {
        // Navigate to home page
        localStorage.setItem("username",user.username)
        localStorage.setItem("email",user.email)
        router.push('/');
      } else {
        // Handle case when user is not authenticated
        setPageError('User not authenticated. Verify Email')
        console.error('User not authenticated');
      }
    } catch (error) {
      // Handle login error
      setPageError('Login error:')
      console.error('Login error:' + JSON.stringify(error));
    }
  };

  return (
        <Header>
            <div className="w-2/5 mx-auto border border-gray-300 rounded-xl p-8 mt-4">
            <p className="text-xl font-medium mb-4 text-center tracking-widest">Login</p>
            <p className="text-sm font-light text-center mb-4 tracking-wide">Welcome back to ECOMMERCE</p>
            <p className="text-xs mb-2 font-extralight text-center tracking-wide">The next gen business marketplace</p>
            <div>
              <label htmlFor="email" className="block font-thin tracking-wide text-gray-700 text-xs mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter"
                className="w-full border border-gray-200 rounded px-3 py-2 text-xs mb-2"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block font-thin tracking-wide text-gray-700 text-xs mb-2">Password</label> 
                <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter"
                className="w-full border border-gray-200 rounded px-3 py-2 pr-10 text-xs mb-2"
              />
              <span 
              onClick={togglePasswordVisibility}
              className="absolute mt-2 inset-y-0 right-0 flex items-center pr-3 text-xs font-thin text-black-500 cursor-pointer underline">
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <button
            type="submit"
            onClick={(e)=>{e.preventDefault();handleLogin()}}
            className="w-full bg-black text-white font-light tracking-widest text-xs px-6 py-4 rounded uppercase mt-6 mx-auto block hover:bg-gray-800">Login</button>
            <hr className="mt-6 mb-2 border-gray-400" />
          <div className="flex justify-center">
          <p className="text-xs mt-4 text-center text-gray-700">Don`t have an Account? <span className="font-light cursor-pointer uppercase tracking-widest hover:underline font-semibold"><Link href='/signup'>sign up</Link></span></p>
        </div>
        {pageError ? <p className='mt-4 text-xs text-red-600 text-center'>{pageError}</p>: <></>}
            </div>
      </Header>
  );
};

export default LoginForm;
