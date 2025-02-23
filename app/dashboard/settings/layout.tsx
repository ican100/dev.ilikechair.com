import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Readonly<Props>) => {
  return <>{children}</>
}

export default Layout
