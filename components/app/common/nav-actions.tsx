'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Flex } from '@radix-ui/themes'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GoLock } from 'react-icons/go'
import { HiMiniLanguage } from 'react-icons/hi2'
import { IoSettingsOutline } from 'react-icons/io5'
import { SlSizeFullscreen } from 'react-icons/sl'

import { useStore } from '@/store'

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
} from '@components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@components/ui/sheet'
import { Switch } from '@components/ui/switch'

const DropdownMenuArrow = DropdownMenuPrimitive.Arrow

export function NavActions() {
  const router = useRouter()

  const profile = useStore(state => state.profile)

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 锁屏
  const toggleLockScreen = useStore(state => state.toggleLockScreen)

  const logout = useStore(state => state.logout)
  const handleLogout = async () => {
    try {
      // 确保退出全屏
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen()
      }

      logout()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-center gap-2 text-sm'>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>
          <Button variant='ghost' size='icon' className='h-7 w-7'>
            <HiMiniLanguage />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={true}>中文 - Chinese</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={false}>英文 - English</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant='ghost' size='icon' className='h-7 w-7'>
            <GoLock />
          </Button>
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
      <Button variant='ghost' size='icon' className='h-7 w-7' onClick={toggleFullscreen}>
        <SlSizeFullscreen />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>
          <Avatar className='h-7 w-7'>
            <AvatarImage src={profile?.profile_url} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' align='end' sideOffset={4}>
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
              <AlertDialogContent className='w-96'>
                <AlertDialogHeader>
                  <AlertDialogTitle>确定要退出登录吗?</AlertDialogTitle>
                  <AlertDialogDescription>退出登录后，您需要重新输入账号和密码才能登录.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取 消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>确 认</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon' className='h-7 w-7'>
            <IoSettingsOutline />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>项目配置</SheetTitle>
            <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
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
    </div>
  )
}
