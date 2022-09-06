import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Signin = () => {
    const { data: session } = useSession();

    const router = useRouter();
        const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();
    
      const submitHandler = async ({ email, password }) => {
        
        try {
          const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
          if (result.error) {
            toast.error(result.error);
          }
        } catch (err) {
          toast.error(getError(err));
        }
      };

  return (
    <>
    <Head>
        <title>Sign In Page</title>
    </Head>
    
    <form className='mx-auto max-w-screen-md mt-16' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-3xl text-blue-800'>Sign In</h1>
        <div className='mb-4'>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email address",
                    },
            })}
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
            <small id="emailHelp" className='text-sm text-gray-400 '>We&apos;ll never share your email with anyone else</small>
            
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 characters' },
            })}
            className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}

        </div>
        <div className='mb-4'>
            <button className='primary-button mt-4'>Sign In</button>
        </div>
        <div className='text-red-400 text-md'>
            Don&apos;t have an account? &nbsp;
        </div>
        <Link href={`/register?redirect=${redirect || '/'}`}>
        <a className='text-sm text-blue-400'>Register</a>
        </Link>

    </form>
    </>
  )
}

export default Signin

