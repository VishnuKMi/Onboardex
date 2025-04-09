import React from 'react'

export default function Hero () {
  return (
    <div>
      <div className='flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12'>
        <div className='w-full lg:w-6/12'>
          <h2 className='w-full font-bold lg:text-4xl text-3xl lg:leading-10 leading-9'>
            Elevate Commerce with Onboardex: Transforming Your World
          </h2>
          <p className='font-normal text-base leading-6 text-gray-600 mt-6'>
            Welcome to Onboardex, where we empower businesses to revolutionize
            the commerce landscape. In a world that constantly evolves, staying
            ahead is paramount. Our groundbreaking Platform-as-a-Service (PAAS)
            seamlessly integrates Non-Fungible Tokens (NFTs) into both online
            and offline retail experiences, creating a unified commerce
            ecosystem like never before. Discover the future of commerce with
            Onboardex today
          </p>
        </div>
        <div className='w-full lg:w-6/12'>
          <img
            className='lg:block hidden w-full'
            src='https://i.ibb.co/RjNH7QB/Rectangle-122-1.png'
            alt='people discussing on board'
          />
          <img
            className='lg:hidden sm:block hidden w-full'
            src='https://i.ibb.co/16fPqrg/Rectangle-122-2.png'
            alt='people discussing on board'
          />
          <img
            className='sm:hidden block w-full'
            src='https://i.ibb.co/Jxhpxh6/Rectangle-122.png'
            alt='people discussing on board'
          />
        </div>
      </div>
    </div>
  )
}
