import '@/styles/globals.css'
import { Ubuntu, Roboto } from 'next/font/google'

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
  description: ''
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${ubuntu.variable} ${roboto.variable}`}>
      <body className='overflow-x-hidden bg-landing text-white'>
        {children}
      </body>
    </html>
  )
}
