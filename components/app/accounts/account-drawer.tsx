'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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

import type { AccountInput } from '@generated/graphql'

import { CreateAccountDocument, DeleteAccountDocument, UpdateAccountDocument } from '@generated/graphql'

import { Textarea } from '@/components/ui/textarea'
import { PermissionEnum } from '@/enums/permissionEnum'
import { usePermission } from '@/hooks/user-permission'
import { API } from '/#/api'

const formSchema = z.object({
  id: z.number().int(),
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.'
  }),
  app: z.string().min(2, {
    message: 'app must be at least 2 characters.'
  }),
  appid: z.string().min(3, {
    message: 'appid must be at least 3 characters.'
  }),
  app_secret: z.string().min(3, {
    message: 'app secret must be at least 3 characters.'
  }),
  callback_url: z.string().min(3, {
    message: 'callback url must be at least 3 characters.'
  }),
  platform_type: z.number().int()
})

type Props = {
  platformTypes: API.PlatformType[]
  item: API.Account | null
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
}

const AccountDrawer = ({ platformTypes, item, open, setOpen, refetch }: Props) => {
  const { hasPermission } = usePermission()

  const [fetch, { loading }] = useMutation(CreateAccountDocument, {
    variables: { input: {} as AccountInput },
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

  const [updator, { loading: updating }] = useMutation(UpdateAccountDocument, {
    variables: { id: 0, input: {} as AccountInput },
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

  const [deletor, { loading: deleting }] = useMutation(DeleteAccountDocument, {
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
    defaultValues: {
      id: 0,
      name: '',
      app: '',
      appid: '',
      app_secret: '',
      callback_url: '',
      platform_type: 1
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!hasPermission([PermissionEnum.ACCOUNTS_ACTION_CREATE])) {
      toast.error('you have no permission')
      return
    }

    const { id, ...params } = values
    await fetch({ variables: { input: params } })
  }

  const onUpdate = async () => {
    if (item === null) return

    if (!hasPermission([PermissionEnum.ACCOUNTS_ACTION_UPDATE])) {
      toast.error('you have no permission')
      return
    }

    const { id, ...values } = form.getValues()
    await updator({
      variables: { id: item.id, input: values }
    })
  }

  const onDelete = async () => {
    if (item === null) return

    if (!hasPermission([PermissionEnum.ACCOUNTS_ACTION_DELETE])) {
      toast.error('you have no permission')
      return
    }

    await deletor({ variables: { id: item?.id } })
  }

  useEffect(() => {
    if (item) {
      form.reset({ ...(item as z.infer<typeof formSchema>) })
    } else {
      form.reset({
        id: 0,
        name: '',
        app: '',
        appid: '',
        app_secret: '',
        callback_url: '',
        platform_type: 1
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-screen-sm w-full'>
        <DialogHeader>
          <DialogTitle>{item ? '编辑表单' : '创建表单'}</DialogTitle>
          <DialogDescription>这里有你想知道的一切.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off' className='space-y-3'>
            <div className='grid grid-cols-2 gap-5'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>应用名称</FormLabel>
                    <FormControl>
                      <Input className='h-10 shadow-none' placeholder='请输入应用名称' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='app'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>应用标识</FormLabel>
                    <FormControl>
                      <Input className='h-10 shadow-none' placeholder='请输入应用标识' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='appid'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>应用凭据</FormLabel>
                  <FormControl>
                    <Input className='h-10 shadow-none' placeholder='请输入应用凭据' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='app_secret'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>应用密钥</FormLabel>
                  <FormControl>
                    <Textarea rows={4} className='h-10 resize-none shadow-none' placeholder='请输入描述' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='callback_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>回调地址</FormLabel>
                  <FormControl>
                    <Textarea rows={4} className='h-10 resize-none shadow-none' placeholder='请输入描述' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='platform_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>应用类型</FormLabel>
                  <FormControl>
                    <Select onValueChange={e => field.onChange(Number(e))} defaultValue={String(field.value)}>
                      <SelectTrigger className='h-10 shadow-none'>
                        <SelectValue placeholder='请选择应用类型' />
                      </SelectTrigger>
                      <SelectContent>
                        {platformTypes.map(type => (
                          <SelectItem key={type.id} value={String(type.id)}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default AccountDrawer
