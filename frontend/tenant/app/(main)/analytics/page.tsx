import React from 'react'

import { LineChart } from '@/components/LineChart'
import CountCard from '@/components/CountCard'

export default function Analytics () {
  return (
    <>
      <div className='flex flex-wrap mt-6'>
        <div className='w-full lg:w-8/12 mb-12 lg:mb-0 px-4'>
          <LineChart />
        </div>
        <div className='w-full lg:w-4/12 px-4'>
          <CountCard />
        </div>
      </div>
    </>
  )
}
