import React from 'react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { AlignJustify } from 'lucide-react'

export default function Header () {
  return (
    <div>
      <div className='container px-4 mx-auto flex justify-between items-center mb-12'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <img
              src='/logo.png'
              alt='logo'
              className='z-50 h-16 md:h-24 w-auto'
            />
          </Link>
        </div>

        <div
          className='hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0'
          id='navbar-collapse'
        >
          <Link href='/company'>
            <div className='p-2 lg:px-4 md:mx-2 text-gray-400 hover:text-white'>
              Company
            </div>
          </Link>
          <Link href='/customers'>
            <div className='p-2 lg:px-4 md:mx-2 text-gray-400 hover:text-white'>
              Customers
            </div>
          </Link>
          <Link href='https://vishnu-kms-organization.gitbook.io/onboardex/'>
            <div className='p-2 lg:px-4 md:mx-2 text-gray-400 hover:text-white'>
              Docs
            </div>
          </Link>
          <button className='p-2 lg:px-4 md:mx-2 text-gray-400 hover:text-white'>
            <Link href='https://my.onboardex.com/login'>Login</Link>
          </button>
          <button className='p-2 lg:px-6 md:mx-2 text-gray-400 hover:text-white tracking-wider rounded-full border border-white border-opacity-50 hover:bg-white hover:bg-opacity-10'>
            <Link href='https://my.onboardex.com/register'>SIGN UP</Link>
          </button>
        </div>

        <div className='md:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AlignJustify />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-8'>
              <Link href='/company'>
                <DropdownMenuItem>Company</DropdownMenuItem>
              </Link>
              <Link href='/customers'>
                <DropdownMenuItem>Customers</DropdownMenuItem>
              </Link>
              <Link href='https://vishnu-kms-organization.gitbook.io/onboardex/'>
                <DropdownMenuItem>Docs</DropdownMenuItem>
              </Link>
              <Link href='https://my.onboardex.com/login'>
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
              <Link href='https://my.onboardex.com/register'>
                <DropdownMenuItem>Sign up</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
