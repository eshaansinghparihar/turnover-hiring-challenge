/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState, type ReactNode } from 'react'
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface HeaderProps {
    title?: string;
    children?: ReactNode;
  }

export default function Header({title= 'ecommerce', children}:HeaderProps)
{

    const router = useRouter()
    const [isUserLoggedIn, setUserLoggedIn]=useState(false)
    const [userData, setUserData]=useState({
        name:''
      })

    const logoutHandler=()=>{
        localStorage.clear()
        setUserLoggedIn(false)
        router.push('/login')
    }

    useEffect(()=>{
        const name=localStorage.getItem("username");
        if(name){
          setUserData({...userData, name:name})
          setUserLoggedIn(true)
        }
      },[])
        
  return (
    <div>
        <div className='flex flex-row text-xs mt-2 font-thin'>
            <div className="flex-grow"></div>
                <div className='flex'>
                    <ul className='flex'>
                        <li className='mr-2'>Help</li>
                        <li className='mr-2'>Orders & Returns</li>
                        <li className='mr-2'>Hi<span>{isUserLoggedIn ? `,${userData.name}` : ''}</span></li>
                        {isUserLoggedIn && <li onClick={logoutHandler} className='mr-2 cursor-pointer hover:underline'>Logout</li>}
                    </ul>
                </div>
        </div>

        <div className='flex flex-row justify-between mt-2 items-bottom'>
        <p className='text-2xl uppercase font-bold tracking-widest ml-2'> {title}</p>
  
        <div className='text-base'>
            <ul className='flex justify-center gap-8 font-medium'>
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New stock</li>
            <li>Trending</li>
            </ul>
        </div>

        <div className='text-sm mr-2'>
            <ul className='flex gap-6'>
            <li><MagnifyingGlassIcon className="h-5 w-5" /></li>
            <li><ShoppingCartIcon className="h-5 w-5" /></li>
            </ul>
        </div>
        </div>

        
        <div className='text-xs flex items-center justify-center bg-gray-200 h-full'>
        <div className='flex items-center'>
        <svg className='h-5 w-5 text-black-900 mr-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>

            <span className='text-black-800 font-light'>Get 10% off on business sign up</span>
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='h-5 w-5 text-black-900 ml-2'>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>

        </div>
        </div>

        {children}

    </div>
  )
}
