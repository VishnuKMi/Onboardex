import {
  CheckCheck,
  FileBox,
  MailCheck,
  ShoppingCart,
  Sparkle
} from 'lucide-react'
import React from 'react'

export default function WorkingModel () {
  return (
    <div className='overflow-y-hidden'>
      <div className='mx-auto container f-f-p px-4 xl:px-0 py-24'>
        <h1 className='focus:outline-none text-center text-3xl lg:text-4xl font-extrabold lg:leading-9 tracking-wider'>
          How it works?
        </h1>
        <div className='md:mt-24 f-f-p'>
          <div className='hidden md:flex justify-center w-full'>
            <div className='flex flex-col items-center md:items-end md:pr-12 md:border-r-4 border-gray-300 relative md:w-1/2'>
              <div className='p-12 bg-[#818CF8] rounded-full'>
                <FileBox size={50} />
              </div>
              <div>
                <img
                  className='focus:outline-none mt-24'
                  src='/2.png'
                  alt='='
                />
              </div>
              <div className='flex mt-12 flex-col items-center lg:items-end md:w-8/12'>
                <h1 className='focus:outline-none text-xl font-bold leading-5'>
                  Customer Purchase
                </h1>
                <h2 className='focus:outline-none text-gray-500 mt-3 pl-3 text-center md:text-right text-base leading-6 tracking-wide'>
                  Customer buys a product from your store
                </h2>
              </div>
              <div className='p-12 bg-[#818CF8] rounded-full mt-24'>
                <MailCheck size={50} />
              </div>

              <div>
                <img
                  className='focus:outline-none mt-24'
                  src='/4.png'
                  alt='='
                />
              </div>

              <div className='flex mt-12 flex-col items-center lg:items-end md:w-8/12'>
                <h1 className='focus:outline-none text-xl font-bold leading-5'>
                  Claim NFT
                </h1>
                <h2 className='focus:outline-none text-gray-500 mt-3 pl-3 text-center md:text-right text-base leading-6 tracking-wide'>
                  With a simple click, claim brand's unique NFT proving
                  ownership of the product.
                </h2>
              </div>

              <div className='p-12 bg-[#818CF8] rounded-full mt-24'>
                <Sparkle size={50} />
              </div>
              <img
                className='hidden md:block absolute right-0 top-0 -mt-2 -mr-1'
                src='https://cdn.tuk.dev/assets/components/111220/Fs7/line.png'
                alt=''
              />
            </div>
            <div className='flex flex-col items-center md:items-start md:pl-12 lg:border-gray-400 mt-20 md:mt-0 md:w-1/2'>
              <div>
                <img src='/1.png' alt='' />
              </div>
              <div className='flex mt-6 flex-col items-center md:items-start md:w-8/12'>
                <h1 className='focus:outline-none text-xl font-bold leading-5'>
                  Mint NFTs
                </h1>
                <h2 className='focus:outline-none text-gray-500 mt-3 text-base leading-6 tracking-wide'>
                  Mint NFTs for the launched products effortlessly
                </h2>
              </div>
              <div className='p-12 bg-[#818CF8] rounded-full mt-32'>
                <ShoppingCart size={50} />
              </div>
              <div>
                <img className='focus:outline-none mt-20' src='/3.png' alt='' />
              </div>
              <div className='flex mt-6 flex-col items-center md:items-start md:w-8/12'>
                <h1 className='focus:outline-none text-xl font-bold leading-5'>
                  Email Notification
                </h1>
                <h2 className='focus:outline-none text-gray-500 mt-3 text-base leading-6 tracking-wide'>
                  The customer receives an email with their NFT details
                </h2>
              </div>

              <div className='p-12 bg-[#818CF8] rounded-full mt-24'>
                <CheckCheck size={50} />
              </div>

              <div>
                <img className='focus:outline-none mt-20' src='/5.png' alt='' />
              </div>

              <div className='flex mt-6 flex-col items-center md:items-start md:w-8/12'>
                <h1 className='focus:outline-none text-xl font-bold leading-5'>
                  Unlock Possibilities
                </h1>
                <h2 className='focus:outline-none text-gray-500 mt-3 text-base leading-6 tracking-wide'>
                  Owns a piece of brand and start trading exclusive NFTs
                </h2>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className='md:hidden flex flex-col items-center w-full'>
            <div className='p-8 bg-[#818CF8] rounded-full my-10'>
              <FileBox size={50} />
            </div>
            <div>
              <img src='/1.png' alt='' />
            </div>
            <div className='mt-10'>
              <h1 className='text-xl text-center tracking-wide leading-5 font-bold'>
                Mint NFTs
              </h1>
              <h2 className='text-gray-500 mt-3 text-center text-base leading-6 tracking-wide'>
                Mint NFTs for the launched products effortlessly
              </h2>
            </div>
            <div className='p-8 bg-[#818CF8] rounded-full my-10'>
              <ShoppingCart size={50} />
            </div>
            <div>
              <img src='/2.png' alt='' />
            </div>
            <div className='mt-10'>
              <h1 className='text-xl tracking-wide text-center leading-5 font-bold'>
                Customer Purchase
              </h1>
              <h2 className='text-gray-500 mt-3 pl-3 text-center text-base leading-6 tracking-wide'>
                Customer buys a product from your store
              </h2>
            </div>
            <div className='p-8 bg-[#818CF8] rounded-full my-10'>
              <MailCheck size={50} />
            </div>
            <div>
              <img src='/3.png' alt='' />
            </div>
            <div className='flex mt-10 flex-col items-center md:items-start md:w-8/12'>
              <h1 className='text-xl text-center tracking-wide leading-5 font-bold'>
                Email Notification
              </h1>
              <h2 className='text-gray-500 mt-3 text-center text-base leading-6 tracking-wide'>
                The customer receives an email with their NFT details
              </h2>
            </div>

            <div className='p-8 bg-[#818CF8] rounded-full my-10'>
              <CheckCheck size={50} />
            </div>
            <div>
              <img src='/4.png' alt='' />
            </div>
            <div className='mt-10'>
              <h1 className='text-xl text-center tracking-wide leading-5 font-bold'>
                Claim NFT
              </h1>
              <h2 className='text-gray-500 mt-3 text-center text-base leading-6 tracking-wide'>
                With a simple click, claim brand's unique NFT proving ownership
                of the product.
              </h2>
            </div>

            <div className='p-8 bg-[#818CF8] rounded-full my-10'>
              <Sparkle size={50} />
            </div>
            <div>
              <img src='/5.png' alt='' />
            </div>
            <div className='mt-10'>
              <h1 className='text-xl text-center tracking-wide leading-5 font-bold'>
                Unlock Possibilities
              </h1>
              <h2 className='text-gray-500 mt-3 text-center text-base leading-6 tracking-wide'>
                Owns a piece of brand and start trading exclusive NFTs
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
