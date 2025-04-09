import '@/styles/globals.css'
import { Ubuntu, Roboto } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ubuntu'
})
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto'
})

export const metadata = {
  title: 'Onboardex',
  description: 'A Minoid Product'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${ubuntu.variable} ${roboto.variable}`}>
      <body className='overflow-x-hidden bg-landing text-white'>
        <div className='hidden sm:block'>
          <div className='bg-[#242753] absolute top-0 left-52 h-[150px] w-[500px] rounded-bl-full rounded-br-full blur-[5rem] -z-10'></div>
          <div className='bg-[#3C5A6F] absolute top-80 right-0 h-[500px] w-[300px] rounded-tl-full rounded-bl-full blur-[7rem] -z-10'></div>
        </div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
