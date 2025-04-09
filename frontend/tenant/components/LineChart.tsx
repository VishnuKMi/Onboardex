'use client'

import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, // x axis
  LinearScale, // y axis
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import { useSession } from 'next-auth/react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      responsive: true,
      position: 'bottom' as 'bottom',
      align: 'end' as 'end'
    }
  },
  tension: 0.4,
  scales: {
    x: {
      display: true,
      grid: {
        display: false
      }
    },
    y: {
      display: true,
      ticks: {
        stepSize: 5
      },
      grid: {
        display: false
      }
    }
  }
}

export function LineChart () {
  const [chartData, setChartData] = useState(null)
  const [selectedTimeRange, setSelectedTimeRange] = useState(null)

  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/tenants/txn-history', {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          headers: {
            // @ts-ignore
            Authorization: `Bearer ${session.accessToken}`
          }
        })

        const transactions = response.data.data

        const monthlyData = {}

        transactions.forEach(txn => {
          const txnDate = new Date(txn.transactionDate)
          const year = txnDate.getFullYear().toString().slice(-2)
          const monthYear = `${txnDate.toLocaleString('default', {
            month: 'short'
          })} ${year}`

          if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = {
              mints: 0,
              transfers: 0
            }
          }

          if (txn.type.code === 'MINT') {
            monthlyData[monthYear].mints += 1
          } else if (txn.type.code === 'TRANSFER') {
            monthlyData[monthYear].transfers += 1
          }
        })

        const labels = Object.keys(monthlyData)
        const mintsData = labels.map(month => monthlyData[month].mints)
        const transfersData = labels.map(month => monthlyData[month].transfers)

        setChartData({
          labels,
          datasets: [
            {
              label: 'Mints',
              // data: totalMintsSum,
              data: mintsData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true
            },
            {
              label: 'Transfers',
              // data: totalTransfersSum,
              data: transfersData,
              borderColor: 'rgba(255, 159, 64, 1)',
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              fill: true
            }
          ]
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [session])

  return (
    <div className='flex gap-4'>
      <div className='sm:container bg-white rounded-lg shadow-md p-4 pb-16'>
        <div className='flex text-lg font-semibold justify-between my-2 text-black'>
          Total Usage
          {/* Time range selector */}
          <div className='flex gap-4 text-xs'>
            <button
              className={`border px-2 rounded-md ${
                selectedTimeRange === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => setSelectedTimeRange('all')}
            >
              All
            </button>
            <button
              className={`border px-4 rounded-md ${
                selectedTimeRange === '1M'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => setSelectedTimeRange('1M')}
            >
              1M
            </button>
            <button
              className={`border px-4 rounded-md ${
                selectedTimeRange === '6M'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => setSelectedTimeRange('6M')}
            >
              6M
            </button>
            <button
              className={`border px-4 rounded-md ${
                selectedTimeRange === '1Y'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => setSelectedTimeRange('1Y')}
            >
              1Y
            </button>
          </div>
        </div>
        {chartData ? (
          <div>
            <Line options={options} data={chartData} />
          </div>
        ) : (
          <div className='flex justify-center items-center h-28'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
          </div>
        )}
      </div>
    </div>
  )
}
