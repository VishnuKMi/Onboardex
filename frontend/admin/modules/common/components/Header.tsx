import React from 'react'
import Image from 'next/image'
import { Bell } from 'lucide-react'

export const Header = () => {
  const user = {
    name: 'John Doe',
    image: '/images/user.png'
  }
  return (
    <div>
      <div className='flex justify-between pt-4 mx-4'>
        <div>
          <div className='font-semibold'>Welcome, {user.name}</div>
        </div>
        <div className='flex items-center justify-end'>
          <div className='relative'>
            <div className='bg-white p-[0.6rem] rounded-md cursor-pointer'>
              <Bell />
            </div>
            <div className='w-2 h-2 bg-red-500 rounded-full absolute top-[10px] right-[10px]'></div>
          </div>
          <div className='font-semibold pl-6 pr-4'>{user.name}</div>
          {user.image ? (
            <div className='relative h-10 w-10'>
              <Image
                src={user.image}
                alt=''
                className='inline-block rounded-full'
                fill
              />
            </div>
          ) : (
            <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-stone-100'>
              <svg
                className='h-full w-full text-stone-300'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
