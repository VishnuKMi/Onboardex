import Link from 'next/link'
import React from 'react'

export default function Card2 () {
  return (
    <div className='text-center lg:text-left'>
      <div className='grid items-center gap-12 lg:grid-cols-2'>
        <div className='mb-12 lg:mb-0'>
          <div className='relative w-full overflow-hidden rounded-lg shadow-lg hidden lg:flex'>
            <img alt='' src='/stepin.png' />
          </div>
        </div>
        <div className='lg:mt-0'>
          <div className='uppercase tracking-widest text-blue-400 text-lg md:text-xl'>
            What We Do
          </div>
          <div className='text-xl md:text-2xl lg:text-4xl roboto-700 leading-tight tracking-wide mt-2'>
            Redefining Your Digital Domain
          </div>
          <div className='lg:hidden flex justify-center mt-4'>
            <img alt='' src='/stepin.png' className='h-48 w-auto' />
          </div>
          <div className='mt-4 text-lg md:text-xl lg:text-2xl'>
            Discover seamless NFT minting with Onboardex. Our platform
            streamlines the creation and management of NFTs, empowering creators
            and businesses to tap into the world of decentralized ownership
            effortlessly.
          </div>
          <Link href='https://my.onboardex.com/login'>
            <button className='uppercase text-sm md:text-base roboto-500 bg-purple-600 py-2 px-6 rounded-full mt-6 md:w-[260px] lg:w-[320px] hover:bg-purple-900 transition'>
              Enroll Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
