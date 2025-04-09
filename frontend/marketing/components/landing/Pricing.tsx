import React from 'react'
import { AiFillCheckSquare } from 'react-icons/ai'
import { pricingData } from '@/lib/data'

export default function Pricing () {
  return (
    <div className='container my-24 mx-auto'>
      <div className='text-center'>
        <h2 className='mb-12 text-3xl font-bold'>Pricing</h2>
        <div className='mt-[4px] text-xl md:text-4xl roboto-700 leading-tight tracking-wide'>
          Choose A Plan Tailored <br />
          To Your Needs
        </div>
        <div className='flex justify-center mt-8'>
          <div className='w-24 py-2 border border-white rounded-l-lg cursor-pointer hover:bg-white hover:bg-opacity-20 transition'>
            Monthly
          </div>
          <div className='w-24 py-2 border border-white rounded-r-lg cursor-pointer hover:bg-white hover:bg-opacity-20 transition'>
            Yearly
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='text-xs text-gray-400 mt-2 ml-24'>(save 20%)</div>
      </div>

      <div className='grid gap-6 lg:grid-cols-3 lg:gap-x-12 mt-8'>
        {pricingData.map((item, index) => (
          <div className='mb-6 lg:mb-0' key={index}>
            <div className='relative block h-full rounded-xl !bg-priceCard shadow-md dark:bg-neutral-700'>
              <div className='border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-10'>
                <p className='mb-4 text-sm uppercase'>
                  <strong>{item.title}</strong>
                </p>
                <h3 className='mb-6 text-3xl'>
                  <strong>{item.price}</strong>
                  <small className='text-base text-neutral-500 dark:text-neutral-300'>
                    /year
                  </small>
                </h3>
              </div>
              <div className='p-6 text-sm flex-grow mb-12'>
                {item.features.map((feature, index) => (
                  <li key={index} className='mb-4 flex items-center gap-2'>
                    <AiFillCheckSquare size={15} />
                    {feature}
                  </li>
                ))}
              </div>
              <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full text-center'>
                <button className='py-2 px-8 mb-4 border border-white rounded-lg hover:bg-white hover:text-black transition-all'>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
