import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Flex, Spinner, Text } from '@radix-ui/themes'
import { useMount } from 'ahooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaChevronRight, FaRegUser } from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'
import { IoClose, IoExitOutline } from 'react-icons/io5'
import { RiDashboardLine } from 'react-icons/ri'

import logo from '@/assets/images/logo.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useStore } from '@/store'

const DropdownMenuArrow = DropdownMenuPrimitive.Arrow

const UriHeader = () => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(true)
  const loggedIn = useStore(state => state.loggedIn)
  const profile = useStore(state => state.profile)
  const logout = useStore(state => state.logout)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (loading) setLoading(false)
  }, [loading])
  useMount(() => {
    if (loading) setLoading(false)
  })

  useEffect(() => {
    document.onclick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // 用户登录的button 点击弹窗 tagName === HTML
      if (!target?.closest('.menu-btn') && target.tagName !== 'HTML') {
        setIsOpen(false)
      }
    }
  }, [])

  const Brand = () => (
    <div className='flex items-center justify-between py-5 md:block'>
      <Link href='/'>
        <img src={logo.src} className='w-auto h-auto' alt='' />
      </Link>
      <div className='md:hidden'>
        <button className='menu-btn text-gray-400 hover:text-gray-300 text-3xl' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoClose /> : <FiMenu />}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <div className='bg-gray-900'>
        <header>
          <div className={`md:hidden ${isOpen ? 'mx-2 md:pb-5' : 'hidden'}`}>
            <Brand />
          </div>
          <nav
            className={`md:text-sm ${isOpen ? 'pb-5 absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent' : ''}`}
          >
            <div className='gap-x-14 items-center container mx-auto px-4 md:flex md:px-8'>
              <Brand />
              <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${isOpen ? 'block' : 'hidden'} `}>
                <ul className='flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0'>
                  <li className='text-gray-300 hover:text-gray-400'>
                    <Link href='/' className='block'>
                      首页
                    </Link>
                  </li>
                  <li className='text-gray-300 hover:text-gray-400'>
                    <Link href='/assessments' className='block'>
                      天赋测评
                    </Link>
                  </li>
                  <li className='text-gray-300 hover:text-gray-400'>
                    <Link href='/courses' className='block'>
                      天赋课程
                    </Link>
                  </li>
                  <li className='text-gray-300 hover:text-gray-400'>
                    <Link href='/articles' className='block'>
                      天赋专题
                    </Link>
                  </li>
                  <li className='menu-btn'>
                    {loading ? (
                      <Flex
                        align='center'
                        justify='center'
                        gapX='1'
                        className='py-2 px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex'
                      >
                        <Spinner size='2' />
                        <Text>加载中</Text>
                      </Flex>
                    ) : loggedIn ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className='items-center justify-end mt-6 space-y-6 md:flex md:mt-0'>
                            <Flex
                              justify='center'
                              align='center'
                              gapX='1'
                              className='py-2 px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex'
                            >
                              <Text>{profile?.name}</Text>
                              <FaRegUser />
                            </Flex>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuArrow className='fill-gray-200' />
                          <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                            <RiDashboardLine /> 控制面板
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={logout}>
                            <IoExitOutline /> 退出登录
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link href='/signin'>
                        <Flex
                          align='center'
                          justify='center'
                          gapX='1'
                          className='py-2 px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex'
                        >
                          <Text>登 录</Text>
                          <FaChevronRight />
                        </Flex>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}

export default UriHeader
