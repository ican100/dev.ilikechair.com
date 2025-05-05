import { cookies } from 'next/headers'
import React from 'react'
import { ToastContainer } from 'react-toastify'

import { ApolloWrapper, DefaultLayout, Lockscreen } from '@/layouts'

import '@assets/styles/app.scss'
import '@assets/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  keywords: 'Home',
  description: 'Home',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png'
    }
  ]
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Props>) {
  const lockScreen = cookies().get('screen:state')?.value === 'true'
  return (
    <html lang='zh' suppressHydrationWarning>
      <body className='font-sans'>
        {lockScreen ? (
          <Lockscreen />
        ) : (
          <ApolloWrapper>
            <DefaultLayout>{children}</DefaultLayout>
          </ApolloWrapper>
        )}
        <ToastContainer position='top-center' autoClose={1000} hideProgressBar={false} draggable={false} />
      </body>
    </html>
  )
}
