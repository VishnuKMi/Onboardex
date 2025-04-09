import React from 'react'
import { industries } from '@/lib/data'

export default function Customers () {
  return (
    <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-20 xl:mx-36'>
      <div className='space-y-8 mb-24'>
        <h2 className='text-3xl md:text-4xl roboto-500'>
          Elevating Businesses through Digitalizing Across Sectors
        </h2>
        <p className='text-lg md:text-xl font-light text-gray-600'>
          At Onboardex, We're on a mission to revolutionize various industries
          by harnessing the potential of NFTs (Non-Fungible Tokens). Explore how
          our cutting-edge technology is reshaping these sectors and providing
          innovative solutions.
        </p>
      </div>
      <div className='text-center lg:text-left'>
        {industries.map((industry, index) => (
          <div
            key={index}
            className='grid items-center gap-12 lg:grid-cols-2 mb-36'
          >
            {/* Image on the left (on even-numbered cards) */}
            <div
              className={`mb-12 lg:mb-0 ${
                index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div className='relative w-full overflow-hidden rounded-lg shadow-lg hidden lg:flex'>
                <img alt={industry.title} src={industry.image} />
              </div>
            </div>
            {/* Content on the right (on even-numbered cards) */}
            <div className={`lg:order-${index % 2 === 0 ? '2' : '1'}`}>
              <h1 className='focus:outline-none font-bold md:text-6xl text-4xl leading-tight text-gray-600 mb-6'>
                {industry.title}
              </h1>
              <div className='lg:hidden flex justify-center mt-4'>
                <img
                  alt={industry.title}
                  src={industry.image}
                  className='h-48 w-auto'
                />
              </div>
              <ul className='list-disc list-inside'>
                {industry.description.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    className='focus:outline-none text-base leading-6 mt-2 text-gray-400 2xl:pr-24 xl:pr-0 pr-12'
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
