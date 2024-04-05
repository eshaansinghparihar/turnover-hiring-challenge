import Head from "next/head";
import Link from "next/link";
import Header from "~/components/Header";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <Header/>
      </Head>
    </>
  );
}
