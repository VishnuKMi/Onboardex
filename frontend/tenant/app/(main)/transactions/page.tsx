'use client'

import React, { useEffect, useState } from 'react'
import { Txn, columns } from './columns'
import { DataTable } from './data-table'
import axios from 'axios'
import { useSession } from 'next-auth/react'

async function getData (session) {
  try {
    const response = await axios.get('/tenants/txn-history', {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.accessToken}`
      }
    })

    return response.data.data
  } catch (error) {
    console.error('Error fetching transaction data:', error)
    return []
  }
}

export default function Transactions () {
  const [data, setData] = useState([])

  const { data: session } = useSession()

  useEffect(() => {
    getData(session).then(txnData => {
      // Transform Data
      const transformedData = txnData.map(item => ({
        ...item,
        transactionDate: calTimeElapsed(item.transactionDate),
        fromAddress: truncate(item.fromAddress, 10),
        toAddress: truncate(item.toAddress, 10)
      }))
      setData(transformedData)
    })
  }, [session])

  const calTimeElapsed = date => {
    const now = new Date()
    const txnDate = new Date(date)
    // const diffTime = now - txnDate
    const diffTime = now.getTime() - txnDate.getTime()

    if (diffTime >= 24 * 60 * 60 * 1000) {
      const diffDays = Math.floor(diffTime / (24 * 60 * 60 * 1000))
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffTime >= 60 * 60 * 1000) {
      const diffHours = Math.floor(diffTime / (60 * 60 * 1000))
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else {
      const diffMinutes = Math.floor(diffTime / (60 * 1000))
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    }
  }

  const truncate = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str // Return the original string if it's shorter or equal to the maximum length
    }

    const start = str.substring(0, maxLength / 2)
    const end = str.substring(str.length - maxLength / 2)

    return `${start}...${end}` // Truncate the middle part of the string and add ellipsis
  }

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
