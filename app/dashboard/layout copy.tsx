'use client'

import { ServerError, useLazyQuery } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex, Spinner, Text } from '@radix-ui/themes'
import { useMount } from 'ahooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { GoLock } from 'react-icons/go'
import { GrRefresh } from 'react-icons/gr'
import { HiMiniLanguage } from 'react-icons/hi2'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiMenuUnfold4Line } from 'react-icons/ri'
import { SlSizeFullscreen } from 'react-icons/sl'
import { toast } from 'react-toastify'

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStore } from '@/store'

import { AuthDocument } from '@generated/graphql'
type Props = {
  children: React.ReactNode
}

const Sidebar = ({ children }: Readonly<Props>) => {
  const router = useRouter()
  const loggedIn = useStore(state => state.loggedIn)
  const token = useStore(state => state.token)
  const profile = useStore(state => state.profile)
  const logout = useStore(state => state.logout)
  const [fetch, { loading }] = useLazyQuery(AuthDocument, {
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
      logout()
    }
  })

  useMount(async () => {
    if (loggedIn && token) {
      await fetch()
    }
  })

  const navigation = [
    {
      href: 'javascript:void(0)',
      name: 'Overview',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122'
          />
        </svg>
      )
    },
    {
      href: 'javascript:void(0)',
      name: 'Integration',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z'
          />
        </svg>
      )
    },
    {
      href: 'javascript:void(0)',
      name: 'Plans',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
          />
        </svg>
      )
    },
    {
      href: 'javascript:void(0)',
      name: 'Transactions',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
          />
        </svg>
      )
    }
  ]

  const navsFooter = [
    {
      href: 'javascript:void(0)',
      name: 'Help',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
          />
        </svg>
      )
    },
    {
      href: 'javascript:void(0)',
      name: 'Settings',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
          />
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
        </svg>
      )
    },
    {
      href: 'javascript:void(0)',
      name: 'Logout',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
          />
        </svg>
      )
    }
  ]

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [state, setState] = useState(false)

  const [selectedTab, setSelectedTab] = useState('Overview')

  const tabItems = ['Overview', 'Integration', 'Billing', 'Transactions', 'plans']

  const onLogout = () => {
    // 确保退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }

    logout()
    router.push('/')
  }

  if (loading) {
    return (
      <Flex justify='center' align='center' gapX='1' className='w-full h-screen text-sm text-gray-500'>
        <Spinner size='2' />
        <Text>正在加载，请稍后</Text>
      </Flex>
    )
  }

  return (
    <>
      <div className='flex'>
        <nav className='fixed flex-none top-0 left-0 w-20 h-full border-r bg-white space-y-8'>
          <div className='flex flex-col h-full'>
            <div className='h-20 flex items-center justify-center px-8'>
              <Link href='/' className='flex-none'>
                Logo
              </Link>
            </div>
            <div className='flex-1 flex flex-col h-full'>
              <ul className='px-4 text-sm font-medium flex-1'>
                {navigation.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className='relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group'
                    >
                      <div className='text-gray-500'>{item.icon}</div>
                      <span className='absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150'>
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div>
                <ul className='px-4 pb-4 text-sm font-medium'>
                  {navsFooter.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.href}
                        className='relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group'
                      >
                        <div className='text-gray-500'>{item.icon}</div>
                        <span className='absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150'>
                          {item.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className=' py-4 px-4 border-t'>
                  <Avatar>
                    <AvatarImage src={profile?.profile_url} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className='flex-1 w-full ml-20 overflow-y-auto'>
          <header className='bg-gray-50 top-0 relative min-h-[60px] z-50'>
            <div
              className={`bg-white items-center gap-x-14 px-4 mx-auto lg:flex lg:static ${state ? 'h-full fixed inset-x-0' : ''}`}
            >
              <Flex align='center' justify='between' className='py-3 lg:py-5 lg:block'>
                <ul className='flex items-center lg:space-x-6 space-x-4'>
                  <li>
                    <RiMenuUnfold4Line className='text-base' onClick={() => setState(!state)} />
                  </li>
                  <li>
                    <GrRefresh className='text-base' />
                  </li>
                </ul>
              </Flex>
              <div
                className={`nav-menu flex-1 pb-28 md:mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${state ? '' : 'md:hidden'}`}
              >
                <div className='items-center space-y-6 hidden lg:flex lg:space-x-6 lg:space-y-0'>
                  <form
                    onSubmit={e => e.preventDefault()}
                    className='flex-1 items-center justify-start pb-4 lg:flex lg:pb-0'
                  >
                    <Flex gap='1' align='center' className='px-2 border rounded-lg'>
                      <CiSearch />
                      <input
                        type='text'
                        placeholder='Search'
                        className='w-full px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none'
                      />
                    </Flex>
                  </form>
                  <ul className='flex items-center lg:space-x-6'>
                    <li>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger className='outline-none'>
                          <HiMiniLanguage className='text-lg inline-block' />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className='rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade'
                            sideOffset={5}
                          >
                            <DropdownMenu.Arrow className='fill-white' />
                            <DropdownMenu.Item asChild className='outline-none text-sm'>
                              <button className='block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150'>
                                中文 - Chinese
                              </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item asChild className='outline-none text-sm'>
                              <button className='block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150'>
                                英文 - English
                              </button>
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </li>
                    <li>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <GoLock className='inline-block text-base' />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>锁屏提示?</AlertDialogTitle>
                            <AlertDialogDescription>锁屏后需要重新验证身份，是否继续?</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取 消</AlertDialogCancel>
                            <AlertDialogAction>确 认</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </li>
                    <li>
                      <SlSizeFullscreen onClick={toggleFullscreen} className='text-base' />
                    </li>
                    <li>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger className='outline-none'>
                          <Avatar>
                            <AvatarImage src={profile?.profile_url} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className='min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade'
                            sideOffset={5}
                          >
                            <DropdownMenu.Arrow className='fill-white' />
                            <span className='block text-gray-500/80 p-2'>{profile?.email}</span>
                            <DropdownMenu.Item asChild className='outline-none text-sm'>
                              <Link
                                href='/dashboard/profile'
                                className='block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150'
                              >
                                个人设置
                              </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item asChild className='outline-none text-sm'>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <button className='block w-full p-2 text-sm text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150'>
                                    退出登录
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>确定要退出登录吗?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      退出登录后，您需要重新输入账号和密码才能登录.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>取 消</AlertDialogCancel>
                                    <AlertDialogAction onClick={onLogout}>确 认</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </li>
                    <li>
                      <IoSettingsOutline className='text-base' />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>

          <main>
            <Tabs.Root className='mx-auto' value={selectedTab} onValueChange={val => setSelectedTab(val)}>
              <Tabs.List
                className='hidden bg-gray-100 py-1.5 px-2.5 rounded-lg gap-x-3 overflow-x-auto text-sm sm:flex'
                aria-label='Manage your account'
              >
                {tabItems.map((item, idx) => (
                  <Tabs.Trigger
                    key={idx}
                    className='data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm py-1.5 px-3 rounded-lg duration-150 text-gray-500 hover:text-indigo-600 hover:bg-white active:bg-white/50 font-medium'
                    value={item}
                  >
                    {item}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <div className='relative text-gray-500 sm:hidden'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                    clipRule='evenodd'
                  />
                </svg>
                <select
                  value={selectedTab}
                  className='py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-indigo-600 text-sm'
                  onChange={e => setSelectedTab(e.target.value)}
                >
                  {tabItems.map((item, idx) => (
                    <option key={idx} id={idx.toString()} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {tabItems.map((item, idx) => (
                <Tabs.Content key={idx} className='py-6' value={item}>
                  <p className='text-xs leading-normal'>
                    This is <b>{item}</b> Tab
                  </p>
                </Tabs.Content>
              ))}
            </Tabs.Root>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Sidebar
