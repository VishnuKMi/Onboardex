import React from 'react'
import Card1 from '@/components/landing/Card1'
import Card2 from '@/components/landing/Card2'
import Card3 from '@/components/landing/Card3'
import Hero from '@/components/landing/Hero'
import Pricing from '@/components/landing/Pricing'
import WorkingModel from '@/components/landing/WorkingModel'
import Features from '@/components/landing/features'

export default function Landing () {
  return (
    <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-20 xl:mx-36'>
      <div className='space-y-32'>
        <Hero />

        <Features />

        <div className='space-y-0 lg:space-y-36'>
          <Card1 />
          <Card2 />
        </div>

        <WorkingModel />

        <Pricing />

        <Card3 />
      </div>
    </div>
  )
}
