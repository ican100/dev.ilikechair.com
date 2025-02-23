'use client'

import { ServerError, useLazyQuery, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Spinner } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Separator } from '@components/ui/separator'
import { Switch } from '@components/ui/switch'
import { Textarea } from '@components/ui/textarea'
import { SettingDocument, type SettingInput, UpdateSettingDocument } from '@generated/graphql'

import { API } from '/#/api'

const formSchema = z.object({
  id: z.number().int(),
  title: z.string().min(2, {
    message: 'name must be at least 2 characters.'
  }),
  keywords: z.string().min(2, {
    message: 'app must be at least 2 characters.'
  }),
  description: z.string().min(3, {
    message: 'appid must be at least 3 characters.'
  }),
  host: z.string().min(3, {
    message: 'app secret must be at least 3 characters.'
  }),
  folder: z.string(),
  file_group_id: z.number().int(),
  email_driver: z.string().min(3, {
    message: 'app secret must be at least 3 characters.'
  }),
  email_host: z.string().min(3, {
    message: 'app secret must be at least 3 characters.'
  }),
  email_port: z.number().int(),
  email_username: z.string().min(3, {
    message: 'app secret must be at least 3 characters.'
  }),
  email_password: z.string().min(3, {
    message: 'app secret must be at least 3 characters.'
  }),
  email_encryption: z.any(),
  email_from_address: z.string().min(3, {
    message: 'app secret must be at least 3 characters.'
  }),
  email_from_name: z.string().min(3, {
    message: 'app secret must be at least 3 characters.'
  }),
  registrable: z.boolean()
})

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [fetch, { data, error, refetch }] = useLazyQuery(SettingDocument, {
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    }
  })

  useEffect(() => {
    setLoading(true)
    fetch().then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (error) {
      toast.error('An error occurred while fetching roles.')
    }
  }, [error])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      keywords: '',
      description: '',
      host: '',
      folder: '',
      file_group_id: 1,
      email_driver: '',
      email_host: '',
      email_port: 465,
      email_username: '',
      email_password: '',
      email_encryption: '',
      email_from_address: '',
      email_from_name: '',
      registrable: true
    }
  })

  const [fileGroups, setFileGroups] = useState<API.FileGroup[]>([])
  useEffect(() => {
    if (data?.setting) {
      setLoading(false)
      form.reset({ ...(data.setting as z.infer<typeof formSchema>) })
    }
    if (data?.fileGroups) {
      setFileGroups(data.fileGroups as API.FileGroup[])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const [updator] = useMutation(UpdateSettingDocument, {
    variables: { id: 0, input: {} as SettingInput },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    },
    onCompleted: async () => {
      toast.success('更新成功')
      await refetch()
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { id, folder, ...params } = values
    await updator({
      variables: { id: id, input: params }
    })
  }

  return (
    <>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>系统设置</h2>
          <p className='text-muted-foreground'>可以轻松定制应用的行为，确保其适配业务流程并提升使用体验.</p>
        </div>
        <Separator />
        <div className='space-y-4 lg:space-y-0'>
          {loading ? (
            <Flex justify='center' className='w-full py-44 mx-auto'>
              <Spinner size='3' />
            </Flex>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex gap-5'>
                  <div className='flex-auto'>
                    <div className='space-y-1.5'>
                      <h4>系统设置</h4>
                      <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>标题</FormLabel>
                            <FormControl>
                              <Input className='h-12 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='keywords'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>关键词</FormLabel>
                            <FormControl>
                              <Input className='h-12 shadow-none' placeholder='' {...field} />
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
                            <FormLabel>描述</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={4}
                                className='resize-none shadow-none'
                                placeholder='请输入描述'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator className='my-5' />
                    <div className='space-y-1.5'>
                      <FormField
                        control={form.control}
                        name='host'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>域名地址</FormLabel>
                            <FormControl>
                              <Input className='h-12 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormDescription>eg: https://example.com</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className='md:grid md:gap-5 grid-cols-2 my-5 space-y-5 md:space-y-0'>
                        <FormField
                          control={form.control}
                          name='folder'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>默认上传文件夹</FormLabel>
                              <FormControl>
                                <Input readOnly className='h-12 shadow-none' placeholder='' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='file_group_id'
                          render={({ field }) => (
                            <>
                              <FormItem>
                                <FormLabel>默认上传分组</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={e => field.onChange(Number(e))}
                                    defaultValue={String(field.value)}
                                  >
                                    <SelectTrigger className='h-12 shadow-none'>
                                      <SelectValue placeholder='请选择默认上传分组' />
                                    </SelectTrigger>
                                    <SelectContent>
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
                      </div>
                    </div>
                    <Separator className='my-5' />
                    <FormField
                      control={form.control}
                      name='registrable'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                          <div className='space-y-0.5'>
                            <FormLabel>开启注册</FormLabel>
                            <FormDescription>关闭的话，用户无法注册</FormDescription>
                          </div>
                          <FormControl>
                            <Switch className='block' checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Card className='w-[420px] flex-none shadow-none'>
                    <CardHeader>
                      <CardTitle>邮件客户端设置</CardTitle>
                      <CardDescription>配置邮件客户端可以发送验证码</CardDescription>
                    </CardHeader>
                    <CardContent className=' space-y-1.5'>
                      <FormField
                        control={form.control}
                        name='email_driver'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>邮件驱动</FormLabel>
                            <FormControl>
                              <Input className='h-10 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email_port'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>邮件端口</FormLabel>
                            <FormControl>
                              <Input className='h-10 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email_username'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>邮件名称</FormLabel>
                            <FormControl>
                              <Input className='h-10 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email_password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>邮件密码</FormLabel>
                            <FormControl>
                              <Input className='h-10 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email_encryption'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>邮件验证方式</FormLabel>
                            <FormControl>
                              <Input className='h-10 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email_from_address'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>邮件发送地址</FormLabel>
                            <FormControl>
                              <Input className='h-10 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email_from_name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>邮件发送名</FormLabel>
                            <FormControl>
                              <Input className='h-10 shadow-none' placeholder='' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className='pt-5'>
                  <Button disabled={loading} type='submit'>
                    保 存
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </>
  )
}

export default Page
