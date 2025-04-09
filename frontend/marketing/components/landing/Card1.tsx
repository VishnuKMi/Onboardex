import React from 'react'

export default function Card1 () {
  return (
    <div className='text-center lg:text-left'>
      <div className='grid items-center gap-12 lg:grid-cols-2'>
        <div className='lg:mt-0'>
          <div className='uppercase tracking-widest text-blue-400 text-lg md:text-xl'>
            Why Onboardex
          </div>
          <div className='text-xl md:text-2xl lg:text-4xl roboto-700 leading-tight tracking-wide mt-2'>
            Elevating Commerce Through NFT Integration
          </div>
          <div className='lg:hidden flex justify-center mt-4'>
            <img alt='' src='/analytics.png' className='h-48 w-auto' />
          </div>
          <div className='mt-4 text-lg md:text-xl lg:text-2xl'>
            In a world where commerce continually evolves, staying ahead of the
            curve is paramount. Enter Onboardex, the definitive solution that
            bridges the gap between traditional retail and the limitless
            possibilities of the digital age
          </div>
          {/* <button className='uppercase text-sm md:text-base roboto-500 bg-purple-600 py-2 px-6 rounded-full mt-6 md:w-[260px] lg:w-[320px] hover:bg-purple-900 transition'>
                View Our Pricing
              </button> */}
        </div>
        <div className='mb-12 lg:mb-0'>
          <div className='relative w-full overflow-hidden rounded-lg shadow-lg hidden lg:flex'>
            <img alt='' src='/analytics.png' />
          </div>
        </div>
      </div>
    </div>
  )
}
