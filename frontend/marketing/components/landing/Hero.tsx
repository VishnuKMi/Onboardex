import React from 'react'
import Link from 'next/link'

export default function Hero () {
  return (
    <div>
      <div className='grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 place-content-center'>
        <div className='mr-auto place-self-center flex flex-col items-center md:flex-none lg:items-start lg:col-span-7'>
          <div className='hidden lg:flex text-4xl md:text-6xl lg:text-7xl roboto-700 leading-none tracking-wide'>
            Onboardex
          </div>
          <div className='text-2xl lg:text-4xl mt-2 text-gray-600 italic text-center'>
            Digitalize your world
          </div>
          <div className='lg:hidden flex justify-center mt-4'>
            <img alt='' src='/pc.png' className='h-48 w-auto' />
          </div>
          <div className='roboto-300 text-lg md:text-xl lg:text-2xl mt-4'>
            Empowering You to Seamless Digital <br /> Ownership Experiences
          </div>
          <Link href='https://my.onboardex.com/login'>
            <button className='px-8 py-2 bg-purple-600 mt-6 text-sm md:text-base lg:text-md rounded-full text-white tracking-wider hover:bg-purple-900 transition'>
              REQUEST A DEMO
            </button>
          </Link>
        </div>
        <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
          <img alt='' src='/pc.png' className='h-[400px] w-auto' />
        </div>
      </div>
    </div>
  )
}
