import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function page () {
  return (
    <div>
      <div id='__next'>
        <div className='lg:flex lg:min-h-screen'>
          <div className='relative hidden min-h-screen w-1/3 flex-col overflow-hidden bg-priceCard text-white lg:flex'>
            <div className='xxl:p-16 relative p-10'>
              <Link
                className='inline-flex flex-row items-center'
                href='https://onboardex.com/'
              >
                <Image
                  alt='Onboardex Logo'
                  width={300}
                  height={300}
                  src='/logo.png'
                  className='-mt-[35px] -ml-[30px]'
                />
              </Link>
              <h1 className='xxl:text-4xl xxl:leading-10 mt-2 text-2xl font-bold'>
                Welcome back! Let’s get Onboarding.
              </h1>
              <div className='xxl:text-xl pt-6'>
                Be a part of the next big paradigm shift in <br /> Digital
                Ownership.
              </div>
            </div>
          </div>
          <div className='text-left lg:hidden -mt-[15px]'>
            <Link
              className='inline-flex flex-row items-center'
              href='https://onboardex.com/'
            >
              <Image
                alt='Onboardex Logo'
                width={250}
                height={250}
                src='/logo.png'
              />
            </Link>
          </div>
          <div className='lg:flex lg:w-2/3 lg:flex-1 lg:flex-col lg:items-center'>
            <div className='m-auto px-6 py-8 w-[500px]'>
              <h1 className='font-body xxl:text-4xl mb-8 text-3xl font-bold'>
                Log in
              </h1>
              <form className='xxl:text-lg text-base'>
                <div>
                  <div className='mb-2 flex items-start justify-between '>
                    <label
                      htmlFor='email'
                      className='flex font-mono text-sm uppercase'
                    >
                      <span className='xxl:mb-2 xxl:text-lg font-mono text-base uppercase'>
                        Email
                      </span>
                      <span className='ml-1 text-orange-500'>*</span>
                    </label>
                  </div>
                  <div className='flex w-full rounded-md'>
                    <div className='relative flex flex-grow items-stretch focus-within:z-10'>
                      <input
                        name='email'
                        type='email'
                        className='xxl:text-lg mb-6 h-auto px-4 py-2 text-base focus:outline-none focus:ring focus:ring-transparent ring-0 focus:border-orange-500 focus:bg-white block w-full border rounded-md border-gray-600 placeholder:text-gray-600'
                        id='email'
                      />
                    </div>
                  </div>
                  <div className='mb-2 flex items-start justify-between '>
                    <label
                      htmlFor='password'
                      className='flex font-mono text-sm uppercase'
                    >
                      <span className='xxl:mb-2 xxl:text-lg font-mono text-base uppercase'>
                        Password
                      </span>
                      <span className='ml-1 text-orange-500'>*</span>
                    </label>
                  </div>
                  <div className='flex w-full rounded-md'>
                    <div className='relative flex flex-grow items-stretch focus-within:z-10'>
                      <input
                        name='password'
                        type='password'
                        className='xxl:text-lg mb-6 h-auto px-4 py-2 text-base focus:outline-none focus:ring focus:ring-transparent ring-0 focus:border-orange-500 focus:bg-white block w-full border rounded-md border-gray-600 placeholder:text-gray-600'
                        id='password'
                      />
                    </div>
                  </div>
                  <div className='mb-10'>
                    <button
                      type='submit'
                      className='mb-8 w-full border cursor-pointer items-center font-body select-none md:whitespace-nowrap align-middle outline-0 px-4 py-2 text-sm hover:no-underline rounded-full transition font-mono uppercase border-transparent hover:shadow-hover active:shadow-inner bg-purple-600 hover:bg-purple-500'
                    >
                      <span className='xxl:text-lg text-base'>Login</span>
                    </button>
                    <a
                      className='xxl:text-lg 2xxl:text-xl text-base text-teal-600 underline'
                      href=''
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </form>
              <div className='border-t border-gray-400 pb-8 pt-10 text-center flex'>
                <p className='xxl:text-lg 2xxl:text-xl mb-0 text-base lg:mr-2'>
                  New to Onboardex?
                </p>
                <a
                  className='xxl:text-lg 2xxl:text-xl text-base text-teal-600 underline'
                  href='/register'
                >
                  Sign up today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
