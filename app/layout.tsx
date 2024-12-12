import React from 'react'
import { ToastContainer } from 'react-toastify'

import { ApolloWrapper } from '@layouts/ApolloWrapper'
import DefaultLayout from '@layouts/default'

import '@assets/styles/app.scss'
import '@assets/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next',
  description: 'Generated by create next app'
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='font-sans'>
        <ApolloWrapper>
          <DefaultLayout>{children}</DefaultLayout>
        </ApolloWrapper>
        <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} draggable={false} />
      </body>
    </html>
  )
}
