'use client'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Text } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { API } from '/#/api'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import {
  CreatePermissionTypeDocument,
  DeletePermissionTypeDocument,
  PermissionTypeInput,
  UpdatePermissionTypeDocument
} from '@generated/graphql'

type TabKey = 0 | 1

const formSchema = z.object({
  id: z.number().int(),
  name: z.string().min(2, {
    message: '分类名至少2位'
  }),
  display_name: z.string().min(2, {
    message: '分类标识至少2位'
  }),
  sort_id: z.number().int(),
  permissions: z.any()
})

type Props = {
  types: API.PermissionType[]
  refetch: () => void
}

const TypeDrawer = ({ types, refetch }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: '',
      display_name: '',
      sort_id: 1,
      permissions: []
    }
  })

  const [creator] = useMutation(CreatePermissionTypeDocument, {
    variables: { input: {} as PermissionTypeInput },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    },
    onCompleted: () => {
      toast.success('新增成功')
      setTabKey(0)
      refetch()
    }
  })

  const [updator, { loading: updating }] = useMutation(UpdatePermissionTypeDocument, {
    variables: { id: 0, input: {} as PermissionTypeInput },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    },
    onCompleted: () => {
      toast.success('更新成功')
      onSelect(null)
      setTabKey(0)
      refetch()
    }
  })

  const [deletor, { loading: deleting }] = useMutation(DeletePermissionTypeDocument, {
    variables: { id: 0 },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    },
    onCompleted: () => {
      toast.success('删除成功')
      onSelect(null)
      setTabKey(0)
      refetch()

      // 当 `types` 为空时关闭抽屉
      if (types.length === 1) {
        setOpen(false)
      }
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { id, permissions, ...params } = values
    await creator({ variables: { input: params } })
  }

  const [tabKey, setTabKey] = useState<TabKey>(0)
  const [item, setItem] = useState<API.PermissionType | null>(null)

  const onSelect = (item: API.PermissionType | null) => {
    setItem(item)
    setOpen(true)
    setTabKey(item === null ? 0 : 1)
  }

  useEffect(() => {
    if (!open || item === null || types.length === 0 || tabKey === 0) {
      form.reset({
        id: 0,
        name: '',
        display_name: '',
        sort_id: 1
      })
      setTabKey(types.length === 0 ? 1 : 0)

      // 当 `tabKey === 0` 时确保 `item` 被设置为 `null`
      if (tabKey === 0) {
        setItem(null)
      }
    } else if (item) {
      form.reset({ ...(item as z.infer<typeof formSchema>) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, open, types, tabKey])

  const onUpdate = async () => {
    if (item === null) return
    const { id, permissions, ...values } = form.getValues()
    await updator({
      variables: { id: item.id, input: values }
    })
  }

  const onDelete = async () => {
    if (item === null) return
    await deletor({ variables: { id: item.id } })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' onClick={() => setOpen(true)}>
          <Plus />
          <Text>权限分类</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className={`w-full ${tabKey === 0 ? 'max-w-screen-lg' : 'max-w-[520px]'}`}>
        <DialogHeader>
          <DialogTitle>权限分类</DialogTitle>
          <DialogDescription className='flex justify-between items-center'>
            <Text>新增加的角色需要重新赋予权限跟菜单，才能生效.</Text>
            {tabKey === 0 && (
              <Button variant='secondary' size='sm' onClick={() => setTabKey(1)}>
                <Text>新增分类</Text>
              </Button>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          {tabKey === 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>ID</TableHead>
                  <TableHead>分类名</TableHead>
                  <TableHead>分类标识</TableHead>
                  <TableHead>排序值</TableHead>
                  <TableHead className='text-right'>操 作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {types.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Flex justify='center' className='w-full py-44 mx-auto'>
                        暂无数据
                      </Flex>
                    </TableCell>
                  </TableRow>
                ) : (
                  types.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.display_name}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.sort_id}</TableCell>
                      <TableCell className='text-right'>
                        <Button variant='outline' size='sm' onClick={() => onSelect(item)}>
                          编 辑
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off' className='space-y-3'>
                <FormField
                  control={form.control}
                  name='display_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>分类名</FormLabel>
                      <FormControl>
                        <Input className='h-10' placeholder='请输入分类名' {...field} />
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
                      <FormLabel>分类标识</FormLabel>
                      <FormControl>
                        <Input className='h-10' placeholder='请输入分类标识' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='my-5'>
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
                    <Button type='button' variant='outline' size='lg' onClick={() => onSelect(null)}>
                      取 消
                    </Button>
                    <Button size='lg' type='submit'>
                      提 交
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TypeDrawer
