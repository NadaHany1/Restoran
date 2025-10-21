// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'

// const LoginPage = () => {
//   return (
//     <div className='flex w-[80vw] h-[60vh] my-[10vh] m-auto shadow-2xl rounded-4xl overflow-hidden'>
//       {/* IMAGE CONTAINER */}
//       <div className='hidden md:block relative flex-1 h-full'>
//         <Image src={"https://media.ladro.com.au/wp-content/uploads/2024/09/10185105/Desktop_Hero_Ladro-11-04-24-13-1024x683.jpg"} alt='pizza' fill className='object-cover'/>
//       </div>
//       {/* FORM CONTAINER */}
//       <div className='flex-1 h-full m-auto flex flex-col justify-start items-center gap-5 py-5 rounded-xl'>
//         <h1 className='text-orange-500 font-bold text-3xl border-b-2 border-orange-500 py-4'>Login</h1>
//         <form className='flex flex-col w-[80%] gap-4'>
//           <div className='text-lg flex flex-col'>
//             <label htmlFor="username">Username</label>
//             <input type="text" id='username' className='border-1 border-gray-200 rounded-md focus:outline-1 p-1 focus:outline-orange-500 focus:border-none' />
//           </div>
//           <div className='text-lg flex flex-col'>
//             <label htmlFor="password">Password</label>
//             <input type="password" id = "password" className='border-1 border-gray-200 rounded-md focus:outline-1 p-1 focus:outline-orange-500 focus:border-none' />
//           </div>
//           <button className='p-2 w-[50%] bg-orange-500 text-white text-lg rounded-[40px] m-auto'>Login</button>
//           <Link href='/signup' className='text-orange-500'>forgot password?</Link>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default LoginPage






'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { login, saveAuth } from '@/services/auth'; // adjust this import path to match your project

const LoginPage = () => {
  const router = useRouter();

  // Local state for username, password, and error handling
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const authData = await login(username, password);
      saveAuth(authData); // Save token + user in localStorage
      router.push('/'); // redirect to dashboard or home page
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex w-[80vw] h-[60vh] my-[10vh] m-auto shadow-2xl rounded-xl overflow-hidden'>
      {/* IMAGE CONTAINER */}
      <div className='hidden md:block relative flex-1 h-full'>
        <Image
          src='/login.webp'
          alt='pizza'
          fill
          className='object-cover'
        />
      </div>

      {/* FORM CONTAINER */}
      <div className='flex-1 h-full m-auto flex flex-col justify-start items-center gap-5 py-5 rounded-xl'>
        <h1 className='text-orange-500 font-bold text-3xl border-b-2 border-orange-500 py-4'>Login</h1>

        <form onSubmit={handleSubmit} className='flex flex-col w-[80%] gap-4'>
          <div className='text-md flex flex-col'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='border-1 border-gray-200 rounded-md focus:outline-1 p-1 focus:outline-orange-500 focus:border-none'
              required
            />
          </div>

          <div className='text-md flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border-1 border-gray-200 rounded-md focus:outline-1 p-1 focus:outline-orange-500 focus:border-none'
              required
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='p-2 w-[50%] bg-orange-500 text-white text-md rounded-[40px] m-auto hover:bg-orange-600 disabled:opacity-50'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <Link href='/signup' className='text-orange-500'>
            Forgot password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
