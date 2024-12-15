import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

import { RuiNavbar } from '@/components/rui-navbar'
import { RuiSidebar } from '@/components/rui-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
// import { makeClient } from '@/plugins/apollo'

// import { AuthDocument } from '@generated/graphql'
type Props = {
  children: React.ReactNode
}

const Page = ({ children }: Readonly<Props>) => {
  const token = cookies().get('token')?.value
  if (!token) {
    redirect('/signin')
  }

  const defaultOpen = cookies().get('sidebar:state')?.value === 'true'

  // const { data } = await makeClient().query({ query: AuthDocument })

  // // token 不存在时候，跳转到登录页面
  // if (!token) {
  //   redirect('/signin')
  // }

  // if (data.auth === false) {
  //   redirect('/signin')
  // }

  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <RuiSidebar></RuiSidebar>
        <main className='flex-1 w-full'>
          <RuiNavbar></RuiNavbar>
          {children}
        </main>
      </SidebarProvider>
    </>
  )
}

export default Page
