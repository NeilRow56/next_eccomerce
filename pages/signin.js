import Reacr from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form';

const Signin = () => {

    const {
        handleSubmit,
        register,
        
      } = useForm();
    

  return (
    <>
    <Head>
        <title>Sign in Page</title>
    </Head>
    
    <form className='mx-auto max-w-screen-md mt-16'>
        <h1 className='mb-4 text-3xl text-blue-800'>Sign In</h1>
        <div className='mb-4'>
            <label htmlFor="email">Email</label>
            <input type="email" autoFocus className='border rounded w-full id="email p-2 mb-2'>
            </input>
            <small id="emailHelp" className='text-sm text-gray-400 '>We&apos;ll never share your email with anyone else</small>

        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" autoFocus className='border rounded w-full id="password p-2 mb-2'>
            </input>
            <small id="emailHelp" className='text-sm'>we&apos;ll never share your email with anyone else</small>

        </div>
        <div className='mb-4'>
            <button className='primary-button mt-4'>Sign In</button>
        </div>
        <div className='text-red-400 text-md'>
            Don&apos;t have an account? &nbsp;
        </div>
        <Link href='/register'>
        <a className='text-sm text-blue-400'>Register</a>
        </Link>

    </form>
    </>
  )
}

export default Signin

