'use client'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider } from 'antd'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { toast } from 'react-toastify'
import { z } from 'zod'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { PermissionEnum } from '@/enums/permissionEnum'
import { usePermission } from '@/hooks/user-permission'

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
import { CreateMenuDocument, DeleteMenuDocument, UpdateMenuDocument } from '@generated/graphql'

import type { MenuInput } from '@generated/graphql'

import { API } from '/#/api'

const formSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  display_name: z.string(),
  path: z.string(),
  component: z.string(),
  redirect: z.string(),
  meta: z.object({
    hidden: z.boolean(),
    icon: z.string(),
    title: z.string(),
    affix: z.boolean(),
    permissions: z.string(),
    keep_alive: z.boolean()
  }),
  parent_id: z.number().int(),
  sort_id: z.number().int()
})

type Props = {
  item: API.Menu | null
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
  menus: API.Menu[]
}

const MenuDrawer = ({ item, open, menus, setOpen, refetch }: Props) => {
  const { hasPermission } = usePermission()

  const defaultParams = () => ({
    id: 0,
    name: '',
    display_name: '',
    path: '',
    component: '',
    redirect: '',
    meta: {
      hidden: false,
      icon: '',
      title: '',
      affix: false,
      permissions: '',
      keep_alive: false
    },
    parent_id: 0,
    sort_id: 0
  })

  const [fetch, { loading }] = useMutation(CreateMenuDocument, {
    variables: { input: {} as MenuInput },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    },
    onCompleted: () => {
      toast.success('新增成功')
      setOpen(false)
      refetch()
    }
  })

  const [updator, { loading: updating }] = useMutation(UpdateMenuDocument, {
    variables: { id: 0, input: {} as MenuInput },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    },
    onCompleted: () => {
      toast.success('更新成功')
      setOpen(false)
      refetch()
    }
  })

  const [deletor, { loading: deleting }] = useMutation(DeleteMenuDocument, {
    variables: { id: 0 },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    },
    onCompleted: () => {
      toast.success('删除成功')
      setOpen(false)
      refetch()
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultParams()
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!hasPermission([PermissionEnum.MENUS_ACTION_CREATE])) {
      toast.error('you have no permission')
      return
    }

    const params: MenuInput = {
      name: values.name,
      display_name: values.display_name,
      path: values.path,
      component: values.component,
      redirect: values.redirect,
      meta: {
        hidden: values.meta.hidden,
        icon: values.meta.icon,
        title: values.meta.title,
        affix: values.meta.affix,
        permissions: values.meta.permissions,
        keep_alive: values.meta.keep_alive
      },
      parent_id: values.parent_id,
      sort_id: values.sort_id
    }
    await fetch({ variables: { input: params } })
  }

  const onUpdate = async () => {
    if (item === null) return

    if (!hasPermission([PermissionEnum.MENUS_ACTION_UPDATE])) {
      toast.error('you have no permission')
      return
    }

    const values = form.getValues()
    const params: MenuInput = {
      name: values.name,
      display_name: values.display_name,
      path: values.path,
      component: values.component,
      redirect: values.redirect,
      meta: {
        hidden: values.meta.hidden,
        icon: values.meta.icon,
        title: values.meta.title,
        affix: values.meta.affix,
        permissions: values.meta.permissions,
        keep_alive: values.meta.keep_alive
      },
      parent_id: values.parent_id,
      sort_id: values.sort_id
    }
    await updator({
      variables: { id: item.id, input: params }
    })
  }

  const onDelete = async () => {
    if (item === null) return

    if (!hasPermission([PermissionEnum.MENUS_ACTION_DELETE])) {
      toast.error('you have no permission')
      return
    }

    await deletor({ variables: { id: item?.id } })
  }

  useEffect(() => {
    if (item) {
      form.reset({ ...(item as z.infer<typeof formSchema>) })
    } else {
      form.reset(defaultParams())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-screen-lg w-full'>
        <DialogHeader>
          <DialogTitle>{item ? '编辑表单' : '创建表单'}</DialogTitle>
          <DialogDescription>这里有你想知道的一切.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off' className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      路由名称 <b className='text-red-500 ml-0.5'>*</b>
                    </FormLabel>
                    <FormControl>
                      <Input className='h-10 shadow-none' placeholder='请输入路由名称' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='path'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      路由路径 <b className='text-red-500 ml-0.5'>*</b>
                    </FormLabel>
                    <FormControl>
                      <Input className='h-10 shadow-none' placeholder='请输入路由路径' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='parent_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      菜单类型 <b className='text-red-500 ml-0.5'>*</b>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={e => field.onChange(Number(e))} defaultValue={String(field.value)}>
                        <SelectTrigger className='h-10 shadow-none w-full'>
                          <SelectValue placeholder='请选择菜单类型' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='0'>顶级菜单</SelectItem>
                          {menus.map(menu => (
                            <SelectItem key={menu.id} value={String(menu.id)}>
                              {menu.display_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sort_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      排序 <b className='text-red-500 ml-0.5'>*</b>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        className='h-10 shadow-none'
                        placeholder=''
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='redirect'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>重定向地址</FormLabel>
                    <FormControl>
                      <Input className='h-10 shadow-none' placeholder='请输入重定向地址' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='display_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      默认组件 <b className='text-red-500 ml-0.5'>*</b>
                    </FormLabel>
                    <FormControl>
                      <Input className='h-10 shadow-none' placeholder='请输入菜单名称' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Divider className='text-sm py-5'>路由元信息</Divider>
            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='display_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      菜单名称 <b className='text-red-500 ml-0.5'>*</b>
                    </FormLabel>
                    <FormControl>
                      <Input className='h-10 shadow-none' placeholder='请输入菜单名称' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='meta.icon'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>菜单图标</FormLabel>
                    <FormControl>
                      <div className='flex items-center gap-x-2'>
                        <Input className='h-10 shadow-none w-44' placeholder='请输入菜单名称' {...field} />
                        <Link className='text-sm' target='_blank' href='https://react-icons.github.io/react-icons/'>
                          图标地址
                        </Link>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-start gap-12'>
                <FormField
                  control={form.control}
                  name='meta.hidden'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>是否隐藏</FormLabel>
                      <FormControl>
                        <Switch className='block' checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='meta.keep_alive'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>缓存路由</FormLabel>
                      <FormControl>
                        <Switch className='block' checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='meta.affix'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>隐藏侧边栏</FormLabel>
                      <FormControl>
                        <Switch className='block' checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='meta.permissions'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      所需权限 <b className='text-red-500 ml-0.5'>*</b>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={4} className='h-10 resize-none shadow-none' placeholder='请输入描述' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {item ? (
              <div className='flex justify-end items-center gap-5 pt-5'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={deleting} type='button' variant='outline' size='lg'>
                      删 除
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className='w-96'>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='text-red-500'>是否删除?</AlertDialogTitle>
                      <AlertDialogDescription>删除后无法恢复，请谨慎操作.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取 消</AlertDialogCancel>
                      <AlertDialogAction disabled={deleting} onClick={() => onDelete()}>
                        确 认
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button disabled={updating} size='lg' type='button' onClick={() => onUpdate()}>
                  更 新
                </Button>
              </div>
            ) : (
              <div className='flex justify-end items-center gap-5 pt-5'>
                <Button disabled={loading} type='button' variant='outline' size='lg' onClick={() => setOpen(false)}>
                  取 消
                </Button>
                <Button disabled={loading} size='lg' type='submit'>
                  提 交
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default MenuDrawer
