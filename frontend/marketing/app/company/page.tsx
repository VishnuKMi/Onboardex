import React from 'react'
import Hero from '@/components/company/Hero'
import Cards from '@/components/company/Cards'
import Journey from '@/components/company/Journey'

export default function Platform () {
  return (
    <div className='2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4'>
      <div className='space-y-36'>
        <Hero />
        <Journey />
        <Cards />
      </div>
    </div>
  )
}
