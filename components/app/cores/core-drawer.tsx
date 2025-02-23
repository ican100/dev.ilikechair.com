'use client'

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
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { CoreInput, CreateCoreDocument, DeleteCoreDocument, UpdateCoreDocument } from '@generated/graphql'

import { useEffect } from 'react'

import { API } from '/#/api'

const formSchema = z.object({
  id: z.number().int(),
  name: z.string().min(2, {
    message: '系统名至少2位'
  }),
  display_name: z.string().min(2, {
    message: '显示名称至少2位'
  }),
  description: z.string().min(3, {
    message: '系统描述至少3位'
  }),
  thumb: z.any(),
  is_visible: z.boolean(),
  sort_id: z.number().int()
})

type Props = {
  item: API.Core | null
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
}

const CoreDrawer = ({ item, open, setOpen, refetch }: Props) => {
  const [fetch, { loading }] = useMutation(CreateCoreDocument, {
    variables: { input: {} as CoreInput },
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

  const [updator, { loading: updating }] = useMutation(UpdateCoreDocument, {
    variables: { id: 0, input: {} as CoreInput },
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

  const [deletor, { loading: deleting }] = useMutation(DeleteCoreDocument, {
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

  const defaultParams = () => ({
    id: 0,
    name: '',
    display_name: '',
    description: '',
    thumb: '',
    is_visible: true,
    sort_id: 1
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultParams()
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { id, ...params } = values
    await fetch({ variables: { input: params } })
  }

  const onUpdate = async () => {
    if (item === null) return
    const { id, ...values } = form.getValues()
    await updator({
      variables: { id: item.id, input: values }
    })
  }

  const onDelete = async () => {
    if (item === null) return
    await deletor({ variables: { id: item.id } })
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
      <DialogContent className='max-w-screen-sm w-full'>
        <DialogHeader>
          <DialogTitle>{item ? '编辑系统' : '创建系统'}</DialogTitle>
          <DialogDescription>新增加的系统需要重新赋予权限跟菜单，才能生效.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off' className='space-y-3'>
            <FormField
              control={form.control}
              name='display_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>系统名称</FormLabel>
                  <FormControl>
                    <Input className='h-10' placeholder='请输入系统名称' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>系统标识</FormLabel>
                  <FormControl>
                    <Input className='h-10' placeholder='请输入系统标识' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>系统描述</FormLabel>
                  <FormControl>
                    <Textarea className='resize-none' placeholder='请输入系统描述' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='md:grid md:gap-5 grid-cols-2 my-5 space-y-5 md:space-y-0'>
              <FormField
                control={form.control}
                name='is_visible'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                    <div className='space-y-0.5'>
                      <FormLabel>是否显示</FormLabel>
                      <FormDescription>隐藏的话不会显示</FormDescription>
                    </div>
                    <FormControl>
                      <Switch className='block' checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sort_id'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                    <div className='space-y-0.5'>
                      <FormLabel>排序值</FormLabel>
                      <FormDescription>越小优先展示</FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='请输入'
                        {...field}
                        className='w-20 h-10'
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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

export default CoreDrawer
