'use client'

import * as Separator from '@radix-ui/react-separator'
import { Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BsTwitterX } from 'react-icons/bs'
import { FaFacebookF, FaHome } from 'react-icons/fa'
import { FaInstagram, FaRegUser } from 'react-icons/fa6'
import { GrTest } from 'react-icons/gr'
import { PiYoutubeLogo } from 'react-icons/pi'
import { SiKnowledgebase } from 'react-icons/si'

import logo from '@/assets/images/logo@black.png'
import { company } from '@/config'
import { useStore } from '@/store'

import RuiBacktop from '@components/rui-backtop'

const RuiFooter = () => {
  const router = useRouter()
  const loggedIn = useStore(state => state.loggedIn)
  const pathname = usePathname()

  return (
    <>
      <div className='fixed md:hidden bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
        <div className='grid h-full max-w-lg grid-cols-4 mx-auto font-medium'>
          <Link
            href='/'
            className={`inline-flex justify-center items-center flex-col px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${pathname === '/' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'}`}
          >
            <FaHome />
            <Text className='text-sm'>首页</Text>
          </Link>
          <Flex
            justify='center'
            align='center'
            className={`inline-flex flex-col px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${pathname === '/assessments' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'}`}
            onClick={() => router.push(loggedIn ? '/assessments' : '/signin')}
          >
            <GrTest />
            <Text className='text-sm'>测评</Text>
          </Flex>
          <Link
            href='/courses'
            className={`inline-flex justify-center items-center flex-col px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${pathname === '/courses' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'}`}
          >
            <SiKnowledgebase />
            <Text className='text-sm'>学习</Text>
          </Link>
          <Flex
            justify='center'
            align='center'
            className={`inline-flex flex-col px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${pathname === '/profile' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'}`}
            onClick={() => router.push(loggedIn ? '/profile' : '/signin')}
          >
            <FaRegUser />
            <Text className='text-sm'>我的</Text>
          </Flex>
        </div>
      </div>
      <Separator.Root decorative orientation='vertical' className='h-px w-full bg-gray-100 hidden md:block' />
      <footer className='w-full hidden md:block'>
        <div className='mx-auto container px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full'>
            <div className='col-span-full mb-10 lg:col-span-2 lg:mb-0'>
              <Link href='/' className='flex justify-center lg:justify-start'>
                <img src={logo.src} className='w-auto h-auto' alt='' />
              </Link>
              <p className='py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left'>
                通过简短的测试，我们将帮助你发掘未曾意识到的优势，了解你的学习方式、思维模式以及最佳的工作环境。
              </p>
              <Link
                href='/assessments'
                className='py-2.5 px-5 h-9 block w-fit bg-indigo-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-indigo-700 lg:mx-0'
              >
                开始测试
              </Link>
            </div>
            <div className='lg:mx-auto text-left '>
              <h4 className='text-lg text-gray-900 font-medium mb-7'>Pagedone</h4>
              <ul className='text-sm  transition-all duration-500'>
                <li className='mb-6'>
                  <a href='javascript:' className='text-gray-600 hover:text-gray-900'>
                    儿童天赋
                  </a>
                </li>
                <li className='mb-6'>
                  <a href='javascript:' className=' text-gray-600 hover:text-gray-900'>
                    青少年天赋
                  </a>
                </li>
                <li className='mb-6'>
                  <a href='javascript:' className=' text-gray-600 hover:text-gray-900'>
                    大学生天赋
                  </a>
                </li>
                <li>
                  <a href='javascript:' className=' text-gray-600 hover:text-gray-900'>
                    职场天赋
                  </a>
                </li>
              </ul>
            </div>
            <div className='lg:mx-auto text-left '>
              <h4 className='text-lg text-gray-900 font-medium mb-7'>Products</h4>
              <ul className='text-sm  transition-all duration-500'>
                <li className='mb-6'>
                  <a href='javascript:' className='text-gray-600 hover:text-gray-900'>
                    Figma UI System
                  </a>
                </li>
                <li className='mb-6'>
                  <a href='javascript:' className=' text-gray-600 hover:text-gray-900'>
                    Icons Assets
                  </a>
                </li>
                <li>
                  <a href='javascript:' className=' text-gray-600 hover:text-gray-900'>
                    Responsive Blocks
                  </a>
                </li>
              </ul>
            </div>
            <div className='lg:mx-auto text-left '>
              <h4 className='text-lg text-gray-900 font-medium mb-7'>Support</h4>
              <ul className='text-sm  transition-all duration-500'>
                <li className='mb-6'>
                  <a href='javascript:' className='text-gray-600 hover:text-gray-900'>
                    Customer Support
                  </a>
                </li>
                <li className='mb-6'>
                  <a href='javascript:' className=' text-gray-600 hover:text-gray-900'>
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href='javascript:' className=' text-gray-600 hover:text-gray-900'>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className='lg:mx-auto text-left '>
              <h4 className='text-lg text-gray-900 font-medium mb-7'>Subscribe</h4>
              <p className='text-sm text-gray-500 leading-6 mb-7'>Subscribe to get the latest news from us</p>
              <a
                href='javascript:'
                className='flex items-center justify-center gap-2 border border-indigo-600 rounded-full py-3 px-6 w-fit lg:mx-0  text-sm text-indigo-600 font-semibold transition-all duration-500 hover:bg-indigo-50'
              >
                Subscribe
                <svg width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5'
                    stroke='#4F46E5'
                    stroke-width='1.8'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <Separator.Root decorative orientation='vertical' className='h-px w-full bg-gray-100' />
        <div className='container mx-auto py-7'>
          <div className='flex items-center justify-center flex-col lg:justify-between lg:flex-row'>
            <Flex className='text-sm text-gray-500 '>
              <Text>
                &copy;
                <Link href='/' className='uppercase mx-0.5'>
                  King Talent
                </Link>
                2024 All rights reserved. {company}
              </Text>
              <Separator.Root decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-200' />
              <Link href='/terms' className={`hover:underline ${pathname ? 'text-gray-700' : 'text-gray-500'}`}>
                用户协议
              </Link>
              <Separator.Root decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-200' />
              <Link href='/privacy' className={`hover:underline ${pathname ? 'text-gray-700' : 'text-gray-500'}`}>
                隐私政策
              </Link>
            </Flex>
            <div className='flex mt-4 space-x-4 sm:justify-center lg:mt-0'>
              <Link href='/'>
                <Flex
                  justify='center'
                  align='center'
                  className='w-8 h-8 rounded-full transition-all duration-500 bg-[#33CCFF] hover:bg-gray-900'
                >
                  <BsTwitterX className='text-white' />
                </Flex>
              </Link>
              <Link href='/'>
                <Flex
                  justify='center'
                  align='center'
                  className='w-8 h-8 rounded-full transition-all duration-500 bg-[linear-gradient(45deg,#FEE411_6.9%,#FEDB16_10.98%,#FEC125_17.77%,#FE983D_26.42%,#FE5F5E_36.5%,#FE2181_46.24%,#9000DC_85.57%)]  hover:bg-gradient-to-b from-gray-900 to-gray-900
                        '
                >
                  <FaInstagram className='text-white' />
                </Flex>
              </Link>
              <Link href='/'>
                <Flex
                  justify='center'
                  align='center'
                  className='w-8 h-8 rounded-full transition-all duration-500 bg-[#337FFF] hover:bg-gray-900'
                >
                  <FaFacebookF className='text-white' />
                </Flex>
              </Link>
              <Link href='/'>
                <Flex
                  justify='center'
                  align='center'
                  className='w-8 h-8 rounded-full transition-all duration-500 bg-[#FF0000] hover:bg-gray-900'
                >
                  <PiYoutubeLogo className='text-white' />
                </Flex>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <RuiBacktop />
    </>
  )
}

export default RuiFooter
