/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Head from "next/head";
import {useState} from 'react'
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import SignupForm from "./signup";
import LoginForm from "./login";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from Eshan" });
  // (hello.data) ? console.log(hello.data.greeting) : 'undefined'


  const {data} = api.category.getAll.useQuery({})
  console.log(data)

  const [isUserLoggedIn, setUserLoggedIn]=useState(true)

  const router = useRouter();

  const handleLogin = () => {
    setUserLoggedIn(true);
    router.push("/");
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      <Head>
          { isUserLoggedIn ? 
          <>Hi User</>
          : 
          <>
          <LoginForm onLogin={handleLogin} />
          </>}
      </Head>
    </>
  );
}
