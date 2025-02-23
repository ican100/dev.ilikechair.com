import { cookies } from 'next/headers'
import React from 'react'
import { ToastContainer } from 'react-toastify'

import { ApolloWrapper, DefaultLayout, Lockscreen } from '@/layouts'

import '@assets/styles/app.scss'
import '@assets/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '王者天赋-专业测评工具，帮助你了解自己的天赋，助力职业规划、学业选择和个人成长|广州缘分平台信息科技有限公司',
  keywords:
    '王者天赋,儿童天赋测试与兴趣,青少年天赋测试与发展,大学生天赋与就业测评,职场新人天赋测试与岗位测试,职业人士天赋测试与职业瓶颈,高级管理天赋测试与分析',
  description:
    '天赋测评帮助你识别与生俱来的潜能，让你了解自己的独特优势。通过科学的评估方法，我们为你提供全面的能力与性格分析，助力你在职场和生活中做出更明智的决策。',
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
