"use client"

import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Register = () => {
  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
      <form className='w-full max-w-md space-y-4 p-8 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>
        <div>
          <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
          <input
            type="name"
            id="name"
            name="name"
            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
            placeholder="Enter your password"
            required
          />
        </div>
        <div className='flex flex-col gap-4 items-center justify-between'>
          <Button type="submit" className='w-full'>Register</Button>

          <Link href='/login' className='text-sm hover:'>Already have an account? Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
