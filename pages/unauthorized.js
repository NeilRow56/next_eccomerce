import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';


export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
    <>
    <Head>
      <title>Unauthorized</title>
    </Head>
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </>
  );
}