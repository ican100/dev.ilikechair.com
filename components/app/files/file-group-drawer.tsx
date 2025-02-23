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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import {
  CreateFileGroupDocument,
  DeleteFileGroupDocument,
  FileGroupInput,
  UpdateFileGroupDocument
} from '@generated/graphql'

import { useEffect } from 'react'

import { API } from '/#/api'

const formSchema = z.object({
  id: z.number().int(),
  group_name: z.string().min(2, {
    message: '分组名至少2位'
  }),
  description: z.string().min(3, {
    message: '分组描述至少3位'
  }),
  parent_id: z.number().int().gt(-1),
  sort_id: z.number().int().gt(0, {
    message: '排序必须大于0'
  })
})

type Props = {
  fileGroup: API.FileGroup | null
  open: boolean
  fileGroups: API.FileGroup[]
  setOpen: (open: boolean) => void
  refetch: () => void
}

const FileGroupDrawer = ({ fileGroup, open, setOpen, refetch, fileGroups }: Props) => {
  const [fetch, { loading }] = useMutation(CreateFileGroupDocument, {
    variables: { input: {} as FileGroupInput },
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

  const [updator, { loading: updating }] = useMutation(UpdateFileGroupDocument, {
    variables: { id: 0, input: {} as FileGroupInput },
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

  const [deletor, { loading: deleting }] = useMutation(DeleteFileGroupDocument, {
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
      group_name: '',
      description: '',
      sort_id: 1,
      parent_id: 0
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { id, ...params } = values
    await fetch({ variables: { input: params } })
  }

  const onUpdate = async () => {
    if (fileGroup === null) return
    const { id, ...values } = form.getValues()
    await updator({
      variables: { id: fileGroup.id, input: values }
    })
  }

  const onDelete = async () => {
    if (fileGroup === null) return
    await deletor({ variables: { id: fileGroup.id } })
  }

  useEffect(() => {
    if (fileGroup) {
      form.reset({ ...(fileGroup as z.infer<typeof formSchema>) })
    } else {
      form.reset({
        id: 0,
        group_name: '',
        description: '',
        sort_id: 1,
        parent_id: 0
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileGroup, open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-screen-sm w-full'>
        <DialogHeader>
          <DialogTitle>{fileGroup ? '编辑分组' : '创建分组'}</DialogTitle>
          <DialogDescription>新增加的分组需要重新赋予分组跟菜单，才能生效.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off' className='space-y-3'>
            <FormField
              control={form.control}
              name='group_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>分组名</FormLabel>
                  <FormControl>
                    <Input className='h-10' placeholder='请输入分组名' {...field} />
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
                  <FormLabel>分组描述</FormLabel>
                  <FormControl>
                    <Textarea className='resize-none' placeholder='请输入分组描述' {...field} />
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
            <FormField
              control={form.control}
              name='parent_id'
              render={({ field }) => (
                <>
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 col-span-2'>
                    <div className='space-y-0.5'>
                      <FormLabel>选择分组</FormLabel>
                      <FormDescription>对应分组</FormDescription>
                    </div>
                    <FormControl>
                      <Select onValueChange={e => field.onChange(Number(e))} defaultValue={String(field.value)}>
                        <SelectTrigger className='h-10 w-1/2 shadow-none'>
                          <SelectValue placeholder='请选择分组' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key={0} value='0'>
                            一级分组
                          </SelectItem>
                          {fileGroups.map(file => (
                            <SelectItem key={file.id} value={String(file.id)}>
                              {file.group_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                  <FormMessage />
                </>
              )}
            />
            {fileGroup ? (
              <div className='grid grid-cols-2 gap-5 pt-5'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={deleting} type='button' variant='outline' className='w-full' size='lg'>
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
                <Button disabled={updating} size='lg' type='button' onClick={() => onUpdate()} className='w-full'>
                  更 新
                </Button>
              </div>
            ) : (
              <div className='grid grid-cols-2 gap-5 pt-5'>
                <Button
                  disabled={loading}
                  type='button'
                  variant='outline'
                  className='w-full'
                  size='lg'
                  onClick={() => setOpen(false)}
                >
                  取 消
                </Button>
                <Button disabled={loading} size='lg' type='submit' className='w-full'>
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

export default FileGroupDrawer
