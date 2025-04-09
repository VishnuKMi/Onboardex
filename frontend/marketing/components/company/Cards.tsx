import React from 'react'

export default function Cards () {
  return (
    <div className='flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16'>
      <div className='w-full lg:w-6/12'>
        <h2 className='font-bold lg:text-4xl text-3xl lg:leading-9 leading-7'>
          Our Mission
        </h2>
        <p className='font-normal text-base leading-6 text-gray-600 mt-6 w-full lg:w-10/12 xl:w-9/12'>
          At Onboardex, our mission is to revolutionize the way people
          experience commerce by harnessing the power of decentralization and
          blockchain technology, while also ensuring security and transparency
          in every transaction.
        </p>
        <p className='font-normal text-base leading-6 text-gray-600 w-full lg:w-10/12 xl:w-9/12 mt-10'>
          We believe that every transaction, every interaction, and every
          experience should be exceptional. We're committed to pushing the
          boundaries of innovation and technology to empower businesses and
          individuals alike, all while leveraging the potential of decentralized
          systems to create a more inclusive and secure future for commerce.
        </p>
      </div>

      <div className='w-full lg:w-6/12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10'>
          {/* <!-- Team Card --> */}
          <div className='flex p-4 shadow-lg'>
            <div className='mr-6'>
              <svg
                width='36'
                height='36'
                viewBox='0 0 36 36'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18 15C20.4853 15 22.5 12.9853 22.5 10.5C22.5 8.01472 20.4853 6 18 6C15.5147 6 13.5 8.01472 13.5 10.5C13.5 12.9853 15.5147 15 18 15Z'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M25.5 28.5C27.9853 28.5 30 26.4853 30 24C30 21.5147 27.9853 19.5 25.5 19.5C23.0147 19.5 21 21.5147 21 24C21 26.4853 23.0147 28.5 25.5 28.5Z'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M10.5 28.5C12.9853 28.5 15 26.4853 15 24C15 21.5147 12.9853 19.5 10.5 19.5C8.01472 19.5 6 21.5147 6 24C6 26.4853 8.01472 28.5 10.5 28.5Z'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className=''>
              <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5'>
                Team
              </p>
              <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                Our dedicated team at Onboardex is passionate about reshaping
                the future of commerce through innovation and technology
              </p>
            </div>
          </div>

          {/* <!-- Board Card --> */}
          <div className='flex p-4 shadow-lg'>
            <div className='mr-6'>
              <svg
                width='36'
                height='36'
                viewBox='0 0 36 36'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.5 10.5C12.1569 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 12.1569 4.5 10.5 4.5C8.84315 4.5 7.5 5.84315 7.5 7.5C7.5 9.15685 8.84315 10.5 10.5 10.5Z'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M7.5 33V25.5L6 24V18C6 17.6022 6.15804 17.2206 6.43934 16.9393C6.72064 16.658 7.10218 16.5 7.5 16.5H13.5C13.8978 16.5 14.2794 16.658 14.5607 16.9393C14.842 17.2206 15 17.6022 15 18V24L13.5 25.5V33'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M25.5 10.5C27.1569 10.5 28.5 9.15685 28.5 7.5C28.5 5.84315 27.1569 4.5 25.5 4.5C23.8431 4.5 22.5 5.84315 22.5 7.5C22.5 9.15685 23.8431 10.5 25.5 10.5Z'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M22.5 33V27H19.5L22.5 18C22.5 17.6022 22.658 17.2206 22.9393 16.9393C23.2206 16.658 23.6022 16.5 24 16.5H27C27.3978 16.5 27.7794 16.658 28.0607 16.9393C28.342 17.2206 28.5 17.6022 28.5 18L31.5 27H28.5V33'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className=''>
              <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5'>
                Board
              </p>
              <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                Our experienced board members provide strategic guidance to
                drive Onboardex's mission of transforming commerce experiences
              </p>
            </div>
          </div>

          {/* <!-- Press Card --> */}
          <div className='flex p-4 shadow-lg'>
            <div className='mr-6'>
              <svg
                width='36'
                height='36'
                viewBox='0 0 36 36'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M28.5 7.5H7.5C5.84315 7.5 4.5 8.84315 4.5 10.5V25.5C4.5 27.1569 5.84315 28.5 7.5 28.5H28.5C30.1569 28.5 31.5 27.1569 31.5 25.5V10.5C31.5 8.84315 30.1569 7.5 28.5 7.5Z'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M4.5 10.5L18 19.5L31.5 10.5'
                  stroke='#1F2937'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className=''>
              <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5'>
                Press
              </p>
              <p className='mt-2 font-normal text-base leading-6 text-gray-600'>
                Stay updated with the latest news and updates about Onboardex as
                we embark on a journey to revolutionize commerce
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
