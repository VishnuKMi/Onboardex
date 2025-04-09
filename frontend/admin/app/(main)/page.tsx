import React from 'react'
import {
  ClientListCard,
  ClientStatusCard,
  CountCard,
  LineChart
} from '@/components'

export default function Adminboard () {
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

      <div className='flex flex-wrap my-4'>
        {/* <div className='w-full lg:w-8/12 mb-12 lg:mb-0 px-4'>
          <ClientListCard />
        </div>
        <div className='w-full lg:w-4/12 px-4'>
          <ClientStatusCard />
        </div> */}
        <div className='w-full mb-12 lg:mb-0 px-4'>
          <ClientListCard />
        </div>
      </div>
    </>
  )
}
