import '@/styles/globals.css'
import { Ubuntu, Roboto } from 'next/font/google'
import { SideBar, Header } from '@/modules/common/components'
import { Toaster } from '@/components/ui/toaster'

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
  title: 'Onboardex | Admin',
  description: 'A Minoid Product'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${ubuntu.variable} ${roboto.variable}`}>
      <body className='overflow-x-hidden'>
        <div className='flex justify-start h-screen'>
          <SideBar />
          <div className='flex-1'>
            <Header />
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
