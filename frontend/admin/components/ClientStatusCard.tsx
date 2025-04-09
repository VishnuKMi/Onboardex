import React from 'react'

// components

export default function ClientStatusCard () {
  return (
    <div className='bg-white p-4 shadow-lg rounded'>
      <h3 className='font-semibold text-base mb-6'>LIMIT</h3>

      <div className='block w-full overflow-x-auto'>
        {/* Projects table */}
        <table className='items-center w-full bg-transparent border-collapse'>
          <thead className='thead-light'>
            <tr>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Client
              </th>
              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Mint Left
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                ROLEX
              </th>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                1,480
              </td>
            </tr>
            <tr>
              <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                NIKE
              </th>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                5,480
              </td>
            </tr>
            <tr>
              <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                AMAZON
              </th>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                4,807
              </td>
            </tr>
            <tr>
              <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                DIOR
              </th>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                3,678
              </td>
            </tr>
            <tr>
              <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                LOUIS VUITTON
              </th>
              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                2,645
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
