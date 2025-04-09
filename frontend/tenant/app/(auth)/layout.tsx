import '@/styles/globals.css'
import { Ubuntu, Roboto } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ubuntu'
})
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto'
})

export const metadata = {
  title: 'Onboardex',
  description: ''
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${ubuntu.variable} ${roboto.variable}`}>
      <body className='overflow-x-hidden bg-landing'>
        <div>
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
            <div className='lg:flex lg:w-2/3 lg:flex-1 lg:flex-col lg:items-center'>
              {children}
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
