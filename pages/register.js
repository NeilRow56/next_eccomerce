import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

const Register = () => {
    const initialState = { name: '', email: '', password: '', cf_password: '' }
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password } = userData

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        
      }
    
      const handleSubmit = async e => {
        e.preventDefault()
        console.log(userData)

      }

  return (
    <>
    <Head>
        <title>Register Page</title>
    </Head>
    
    <form className='mx-auto max-w-screen-md mt-16' onSubmit={handleSubmit}>
        <h1 className='mb-4 text-3xl text-blue-800'>Register</h1>
        <div className='mb-4'>
            <label htmlFor="name">Name</label>
            <input type="text" autoFocus className='rounded border p-2  outline-none ring-indigo-300  focus:ring w-full' 
            id="name" name="name" value={name} onChange={handleChangeInput} 
            >
            </input>
            <small id="nameHelp" className='text-sm text-gray-400 '></small>
            

        </div>
        <div className='mb-4'>
            <label htmlFor="email">Email</label>
            <input type="email" autoFocus className='rounded border p-2  outline-none ring-indigo-300  focus:ring w-full'
            name="email" value={email} onChange={handleChangeInput}
            >
            </input>
            <small id="emailHelp" className='text-sm text-gray-400 '>We&apos;ll never share your email with anyone else</small>

        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" autoFocus className='rounded border p-2  outline-none ring-indigo-300  focus:ring w-full mb-4' 
            name="password" value={password} onChange={handleChangeInput} 
            >
            </input>
            <small id="passwordHelp" className='text-sm '></small>

        </div>
        <div>
            <label htmlFor="confirmed_password">Confirm Password</label>
            <input type="password" autoFocus className='rounded border p-2  outline-none ring-indigo-300  focus:ring w-full mb-4'
            name="cf_password" value={cf_password} onChange={handleChangeInput} 
            >
            </input>
            <small id="confirmed_passwordHelp" className='text-sm'></small>

        </div>
        <div className='mb-4'>
            <button className='primary-button mt-4'>Register</button>
        </div>
        <div className='text-red-400 text-md'>
            Already have an account? &nbsp;
        </div>
        <Link href='/signin'>
        <a className='text-sm text-blue-400'>Login Now</a>
        </Link>

    </form>
    </>
  )
}

export default Register

