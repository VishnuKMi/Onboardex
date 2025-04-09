import '@/styles/globals.css'
import { Ubuntu, Roboto } from 'next/font/google'
import { SideBar, Header } from '@/modules/common/components'
import AuthProvider from '@/lib/context/AuthProvider'
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
  title: 'Onboardex | Tenant',
  description: 'A Minoid Product'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${ubuntu.variable} ${roboto.variable} h-full`}>
      <body className='overflow-x-hidden  h-full'>
        <AuthProvider>
          <div className='flex justify-start  h-full'>
            <SideBar />
            <div className='flex-1 p-4 flex flex-col'>
              <Header />
              <main className='flex-1'>{children}</main>
            </div>
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
