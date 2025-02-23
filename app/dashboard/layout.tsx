import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from '@components/app/common/app-sidebar'
import { NavHeader } from '@components/app/common/nav-header'

type Props = {
  children: React.ReactNode
}

export default function Page({ children }: Readonly<Props>) {
  const token = cookies().get('token')?.value
  if (!token) {
    redirect('/signin')
  }

  const defaultOpen = cookies().get('sidebar:state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <NavHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
