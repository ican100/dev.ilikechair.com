'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { useInterval, useMount } from 'ahooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { GoLock } from 'react-icons/go'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Separator } from '@/components/ui/separator'
import { version } from '@/config'
import { useStore } from '@/store'

const Lockscreen = () => {
  const [loading, setLoading] = useState<boolean>(true)
  useMount(() => {
    if (loading) setLoading(false)
  })

  const pathname = usePathname()
  const logout = useStore(state => state.logout)
  const handleClick = () => {
    try {
      logout()
      window.location.href = pathname === '/signin' ? '/' : '/signin'
    } catch (error) {
      console.log(error)
    }
  }

  const [currentTime, setCurrentTime] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })
  useInterval(() => {
    const now = new Date()
    const days = now.getDate().toString().padStart(2, '0')
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')

    setCurrentTime({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    })
  }, 1000)

  if (loading) {
    return (
      <>
        <Flex align='center' justify='center' className='h-screen w-screen mx-auto text-center bg-gray-900 text-white'>
          <Text>正在加载...</Text>
        </Flex>
      </>
    )
  }

  return (
    <>
      <Flex justify='between' className='h-screen w-screen flex-col bg-gray-900 text-white'>
        <Flex justify='center' className='py-5'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <GoLock className='inline-block text-3xl cursor-pointer' />
            </AlertDialogTrigger>
            <AlertDialogContent className='w-96'>
              <AlertDialogHeader>
                <AlertDialogTitle>解锁提示?</AlertDialogTitle>
                <AlertDialogDescription>解锁需要重新验证身份，是否继续?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取 消</AlertDialogCancel>
                <AlertDialogAction onClick={handleClick}>解 锁</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Flex>
        <Box className='text-center flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16'>
          <span className='text-2xl sm:text-3xl font-semibold text-white text-center tracking-widest px-2'>
            Act Now, Time is Short
          </span>
          <div className='flex justify-center gap-3 sm:gap-8'>
            <div className='flex flex-col gap-5 relative'>
              <div className='h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg'>
                <div className='relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-gray-900'></div>
                <span className='lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]'>
                  {currentTime?.days}
                </span>
                <div className='relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-gray-900'></div>
              </div>
              <span className='text-[#8486A9] text-xs sm:text-2xl text-center capitalize'>Days</span>
            </div>
            <div className='flex flex-col gap-5 relative'>
              <div className='h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg'>
                <div className='relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-gray-900'></div>
                <span className='lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]'>
                  {currentTime?.hours}
                </span>
                <div className='relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-gray-900'></div>
              </div>
              <span className='text-[#8486A9] text-xs sm:text-2xl text-center font-medium'>Hours</span>
            </div>
            <div className='flex flex-col gap-5 relative'>
              <div className='h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg'>
                <div className='relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-gray-900'></div>
                <span className='lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]'>
                  {currentTime?.minutes}
                </span>
                <div className='relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-gray-900'></div>
              </div>
              <span className='text-[#8486A9] text-xs sm:text-2xl text-center capitalize'>Minutes</span>
            </div>
            <div className='flex flex-col gap-5 relative'>
              <div className='h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg'>
                <div className='relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-gray-900'></div>
                <span className='lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]'>
                  {currentTime?.seconds}
                </span>
                <div className='relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-gray-900'></div>
              </div>
              <span className='text-[#8486A9] text-xs sm:text-2xl text-center capitalize'>Seconds</span>
            </div>
          </div>
        </Box>
        <Flex className='my-1 flex items-center justify-center text-sm text-gray-600'>
          <Link href='/' className='mx-0.5'>
            © All rights reserved. Blogs Powered by: blogs
          </Link>
          <Separator decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-500' />
          <Text>版本: v{version}</Text>
        </Flex>
      </Flex>
    </>
  )
}

export default Lockscreen
