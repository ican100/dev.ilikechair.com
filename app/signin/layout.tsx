import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Readonly<Props>) => {
  const token = cookies().get('token')?.value
  if (token) {
    redirect('/')
  }

  return <>{children}</>
}

export default Layout
