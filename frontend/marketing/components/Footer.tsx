import React from 'react'
import Image from 'next/image'

export default function Footer () {
  return (
    <footer className='mx-4 md:mx-24'>
      <div className='container mx-auto py-8 md:py-12'>
        {/* Desktop */}
        <div className='hidden md:grid grid-cols-4 gap-6'>
          <div className='col-span-1 text-left'>
            <Image
              alt=''
              src='/logo.png'
              width={200}
              height={200}
              className='-ml-6'
            />
            <div className='text-md text-left text-gray-600'>
              Providing a seamless and user friendly solution for E-commerce
              platforms to integrate NFT minting capabilities into their
              existing platforms.
            </div>
          </div>
          <div className='col-span-1 pl-12'>
            <h2 className='mt-[28px] mb-4 uppercase text-gray-600 roboto-700'>
              Company
            </h2>
            <ul className='space-y-2 text-sm'>
              <li>Home</li>
              <li>About</li>
              <li>Explore</li>
              <li>Resources</li>
            </ul>
          </div>
          <div className='col-span-1'>
            <h2 className='mt-[28px] mb-4 uppercase text-gray-600 roboto-700'>
              Developers
            </h2>
            <ul className='space-y-2 text-sm'>
              <li>API Docs</li>
              <li>API Status</li>
              <li>Support</li>
              <li>Login</li>
            </ul>
          </div>
          <div className='col-span-1'>
            <h2 className='mt-[28px] mb-4 uppercase text-gray-600 roboto-700'>
              Join Our Newsletter
            </h2>
            <form>
              <div className='flex'>
                <div className='relative w-full'>
                  <input
                    type='email'
                    className='block p-2.5 w-full z-20 text-xs text-gray-900 bg-gray-50 rounded-full border-l-gray-100 border-l-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-l-full focus:outline-none'
                    placeholder='Email Address'
                    required
                  />
                  <button
                    type='submit'
                    className='absolute top-0 right-0 py-[8px] px-6 h-full uppercase tracking-wide text-xs text-white bg-purple-600 rounded-full hover:bg-purple-700'
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='col-span-1 col-start-1'>
            <a
              href='mailto:info@onboardex.com'
              rel='noopener noreferrer'
              className='underline underline-offset-4 mt-8 text-gray-600'
            >
              info@onboardex.com
            </a>
          </div>
          <div className='col-span-1 col-start-2 pl-12'>
            <h2 className='mt-[28px] mb-4 uppercase text-gray-600 roboto-700'>
              Contact
            </h2>
            <ul className='space-y-2 text-sm'>
              <li>Email</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
        <div className='hidden md:flex justify-between text-xs text-gray-600 roboto-500 mt-16 mx-6'>
          <div>
            Onboardex LLC <span className='text-sm'>&copy;</span> 2023
          </div>
          <div>Privacy Policy | Terms & Conditions</div>
        </div>

        {/* Mobile and Tablets */}
        <div className='md:hidden'>
          <div className='text-center'>
            <Image
              alt=''
              src='/logo.png'
              width={120}
              height={120}
              className='-ml-[10px]'
            />
            <div className='mt-4 text-gray-600 text-sm text-left'>
              Providing a seamless and user friendly solution for E-commerce
              platforms to integrate NFT minting capabilities into their
              existing platforms.
            </div>
            <div className='mt-2 text-left'>
              <a
                href='mailto:info@onboardex.com'
                rel='noopener noreferrer'
                className='underline underline-offset-4 text-gray-600 text-sm'
              >
                info@onboardex.com
              </a>
            </div>
          </div>
          <div className='grid grid-cols-2 mt-8'>
            <div>
              <h2 className='uppercase text-gray-600 roboto-700'>Company</h2>
              <ul className='space-y-2 text-sm'>
                <li>Home</li>
                <li>About</li>
                <li>Explore</li>
                <li>Resources</li>
              </ul>
            </div>
            <div>
              <h2 className='uppercase text-gray-600 roboto-700'>Developers</h2>
              <ul className='space-y-2 text-sm'>
                <li>API Docs</li>
                <li>API Status</li>
                <li>Support</li>
                <li>Login</li>
              </ul>
            </div>
          </div>

          <div className='mt-8'>
            <h2 className='uppercase text-gray-600 roboto-700'>Contact</h2>
            <ul className='space-y-2 text-sm'>
              <li>Email</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
          <div className='mt-8 my-16 text-center'>
            <h2 className='uppercase text-gray-600 roboto-700 mb-4'>
              Join Our Newsletter
            </h2>
            <form className='mt-6 sm:flex sm:max-w-md'>
              <label htmlFor='email-address' className='sr-only'>
                {' '}
                Email address
              </label>
              <input
                type='email'
                required
                className='w-full min-w-0 border appearance-none rounded-md border-gray-300 bg-white px-2  text-sm leading-7 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full'
                placeholder='Email Address'
              />
              <div className='mt-4 rounded-md sm:mt-0 sm:ml-4 sm:flex-shrink-0'>
                <div className='flex justify-center'>
                  <button
                    className='inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent disabled:bg-gray-400 dark:disabled:bg-slate-700 appearance-none text-white focus:ring-offset-white bg-purple-600 hover:bg-purple-700'
                    type='submit'
                  >
                    <div className='relative'>
                      <div className=''>Subscribe</div>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='flex justify-center text-xs mt-2 text-gray-400'>
            Onboardex LLC <span className='text-sm -mt-[2px]'>&copy;</span> 2023
          </div>
          <div className='flex justify-center text-xs mt-2 text-gray-400'>
            Privacy Policy | Terms & Conditions
          </div>
        </div>
      </div>
    </footer>
  )
}
