'use client'

import React, { useState, useEffect } from 'react'
import { PackagePlus, SendHorizontal } from 'lucide-react'
import axios from 'axios'

export default function CountCard () {
  const [totalMintsSum, setTotalMintsSum] = useState(0)
  const [totalTransfersSum, setTotalTransfersSum] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/total-usage', {
          baseURL: process.env.NEXT_PUBLIC_API_URL
        })

        console.log(response)
        const transactions = response.data.data

        const totalMintsSum = transactions.reduce((sum, txn) => {
          if (txn.type.code === 'MINT') {
            return sum + 1
          }
          return sum
        }, 0)

        const totalTransfersSum = transactions.reduce((sum, txn) => {
          if (txn.type.code === 'TRANSFER') {
            return sum + 1
          }
          return sum
        }, 0)

        setTotalMintsSum(totalMintsSum)
        setTotalTransfersSum(totalTransfersSum)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words mb-6 gap-6 xl:mb-0'>
        <div className='flex-auto p-4 bg-white shadow-lg rounded'>
          <div className='flex flex-wrap justify-center items-center'>
            <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
              <h5 className='text-gray-400 uppercase font-bold text-xs'>
                Total Mints
              </h5>
              <span className='font-semibold text-xl text-black-700'>
                {totalMintsSum}
              </span>
            </div>
            <div className='bg-yellow-400 p-2 rounded-md'>
              <PackagePlus color='white' />
            </div>
          </div>
        </div>

        <div className='flex-auto p-4 bg-white shadow-lg rounded'>
          <div className='flex flex-wrap justify-center items-center'>
            <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
              <h5 className='text-gray-400 uppercase font-bold text-xs'>
                Total transfers
              </h5>
              <span className='font-semibold text-xl text-black-700'>
                {totalTransfersSum}
              </span>
            </div>
            <div className='bg-black p-2 rounded-md'>
              <SendHorizontal color='white' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
