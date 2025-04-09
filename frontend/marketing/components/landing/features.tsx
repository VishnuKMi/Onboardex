import React from 'react'
import { featuresData } from '@/lib/data'

export default function Features () {
  return (
    <div style={{ fontFamily: '"Lato", sans-serif' }}>
      <section className='max-w-8xl mx-auto container'>
        <div className='focus:outline-none flex flex-wrap justify-center gap-10 px-4'>
          {featuresData.map((feature, index) => (
            <div
              key={index}
              aria-label={`card ${index + 1}`}
              className='focus:outline-none flex sm:w-full md:w-5/12 pb-8'
            >
              <div className='w-20 h-20 relative mr-5'>
                <div className='absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1' />
                <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                  <img src={feature.icon} alt={`icon ${index + 1}`} />
                </div>
              </div>
              <div className='w-10/12'>
                <h2 className='focus:outline-none text-lg font-bold leading-tight'>
                  {feature.title}
                </h2>
                <p className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
