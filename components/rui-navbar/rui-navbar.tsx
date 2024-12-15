'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Flex } from '@radix-ui/themes'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CiSearch } from 'react-icons/ci'
import { GoLock } from 'react-icons/go'
import { GrRefresh } from 'react-icons/gr'
import { HiMiniLanguage } from 'react-icons/hi2'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiMenuUnfold4Line } from 'react-icons/ri'
import { SlSizeFullscreen } from 'react-icons/sl'

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
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { useStore } from '@/store'

const DropdownMenuArrow = DropdownMenuPrimitive.Arrow

const RuiNavbar = () => {
  const router = useRouter()
  const profile = useStore(state => state.profile)

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

  // 锁屏
  const toggleLockScreen = useStore(state => state.toggleLockScreen)

  const logout = useStore(state => state.logout)
  const onLogout = () => {
    try {
      // 确保退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }

      logout()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <nav className='bg-gray-50 top-0 relative min-h-[60px] z-50 border-b'>
        <div className='bg-white items-center gap-x-14 px-4 mx-auto lg:flex lg:static'>
          <Flex align='center' justify='between' className='py-3 lg:py-5 lg:block'>
            <ul className='flex items-center lg:space-x-6 space-x-4'>
              <li>
                <SidebarTrigger></SidebarTrigger>
              </li>
              <li>
                <GrRefresh className='text-base' />
              </li>
              <li>
                <RiMenuUnfold4Line className='text-base' />
              </li>
            </ul>
          </Flex>
          <div className='nav-menu flex-1 pb-28 md:mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 md:hidden'>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none'>
                      <HiMiniLanguage className='text-lg inline-block' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuCheckboxItem checked={true}>中文 - Chinese</DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked={false}>英文 - English</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <GoLock className='inline-block text-base' />
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-96'>
                      <AlertDialogHeader>
                        <AlertDialogTitle>锁屏提示?</AlertDialogTitle>
                        <AlertDialogDescription>锁屏后需要重新验证身份，是否继续?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取 消</AlertDialogCancel>
                        <AlertDialogAction onClick={() => toggleLockScreen(true)}>确 认</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </li>
                <li>
                  <SlSizeFullscreen onClick={toggleFullscreen} className='text-base' />
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none'>
                      <Avatar>
                        <AvatarImage src={profile?.profile_url} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuArrow className='fill-gray-200' />
                      <DropdownMenuItem>{profile?.email}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href='/dashboard/profile' className='hover:bg-gray-100'>
                          <Flex align='center' className='w-full text-sm'>
                            <User className='w-4 h-4 mr-1.5' />
                            <span>个人设置</span>
                          </Flex>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <AlertDialog>
                          <AlertDialogTrigger className='w-full'>
                            <Flex align='center' className='w-full text-sm p-2 hover:bg-gray-100'>
                              <LogOut className='w-4 h-4 mr-1.5' />
                              <span>退出登录</span>
                            </Flex>
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
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <Sheet>
                    <SheetTrigger asChild>
                      <IoSettingsOutline className='text-base' />
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>项目配置</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <Flex align='center'>
                        <Switch id='theme' />
                        <Label htmlFor='theme'>主题</Label>
                      </Flex>
                      <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='name' className='text-right'>
                            主题
                          </Label>
                          <Input id='name' value='Pedro Duarte' className='col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='username' className='text-right'>
                            Username
                          </Label>
                          <Input id='username' value='@peduarte' className='col-span-3' />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type='submit'>Save changes</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default RuiNavbar
