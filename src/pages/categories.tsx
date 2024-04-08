import React, { useEffect, useState } from 'react';
import SignupForm from './signup';

const Categories = () => {
  
  const [isUserLoggedIn, setUserLoggedIn]=useState(false)
  const [userData, setUserData]=useState({
    name:'',
    email:''
  })

  useEffect(()=>{
    const name=localStorage.getItem("username");
    const email=localStorage.getItem("email");
    if(name && email){
      setUserData({...userData, name:name, email:email})
      setUserLoggedIn(true)
    }
  },[])
    
  return (
  <>
    {isUserLoggedIn ? <p>Hi, {userData.name}</p>: <><SignupForm/></>}
  </>
  );
};

export default Categories;

