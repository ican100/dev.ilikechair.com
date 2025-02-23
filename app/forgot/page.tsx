/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Signatory } from '@cakioe/kit.js'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Separator from '@radix-ui/react-separator'
import { Box, Card, Container, Flex, Heading, Text } from '@radix-ui/themes'
import { useCountDown, useUnmount } from 'ahooks'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStore } from '@/store'

import { appid, version } from '@config/index'
import { CodeDocument, ResetPasswordDocument } from '@generated/graphql'

const formSchema = z.object({
  email: z
    .string({
      required_error: '请输入邮箱',
      invalid_type_error: '请输入正确的邮箱地址'
    })
    .min(8, {
      message: '邮箱至少8位'
    })
    .email('请输入正确的邮箱地址'),
  security_code: z.string().min(4, {
    message: '验证码至少4位'
  }),
  password: z.string().min(8, {
    message: '新密码至少8位'
  })
})

const Page = () => {
  const app = useStore(state => state.app)
  const signer = new Signatory(appid)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      security_code: ''
    }
  })

  // 验证码倒计时
  const [targetDate, setTargetDate] = useState<number>()
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      setTargetDate(undefined)
    }
  })

  // 组件卸载
  useUnmount(() => {
    setTargetDate(undefined)
  })

  // 验证码是否发送
  const [sent, setSent] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
  const [fetchCode] = useMutation(CodeDocument, {
    variables: { input: '' },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      setTargetDate(undefined)
      if (errors) {
        const message = errors[0].message
        if (message.includes('already Sent')) {
          setSent(true)
        }
        toast.error(message)
      }
    },
    onCompleted: () => {
      toast.success('验证码已经发送到您的邮箱')
      setTargetDate(Date.now() + 60000)
      setSent(true)
    }
  })

  const getSecurityCode = async () => {
    const email = form.getValues().email
    if (email === '') {
      toast.error('请输入邮箱地址')
      return
    }
    const payload = signer.toBase64String({ email: email, action_type: 'reset' })
    await fetchCode({ variables: { input: payload } })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [fetch, { loading, data }] = useMutation(ResetPasswordDocument, {
    variables: { input: '' },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = signer.toBase64String({ app: app, ...values, method: 'reset' })
    await fetch({ variables: { input: payload } })
  }

  if (data && data.resetPassword) {
    toast.success('密码重置成功')
    setSent(false)
  }

  return (
    <>
      <Flex justify='between' className='h-screen w-screen flex-col bg-gray-50'>
        <Flex className='invisible text-center'>TODO</Flex>
        <Box>
          <Container size='1' className='mx-auto max-w-screen-sm rounded-md sm:w-11/12'>
            <Card size='3' variant='ghost' className='shadow bg-white'>
              <Flex justify='between' align='center' className='mb-2.5 border-b pb-2.5'>
                <Heading as='h2' className='text-lg text-gray-700 font-bold leading-none'>
                  忘记密码
                </Heading>
                <Flex align='center' gapX='1'>
                  <Link href='/signin' className='text-gray-700 hover:underline text-sm '>
                    返回登录
                  </Link>
                  <Separator.Root decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-200' />
                  <Link href='/' className='underline text-sm'>
                    回到首页
                  </Link>
                </Flex>
              </Flex>
              <div className='pt-2.5 text-gray-600'>
                <Heading as='h3' className='mb-4 text-base font-bold leading-none'>
                  通过验证账号邮箱进行密码重置
                </Heading>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='sr-only'>登录邮箱</FormLabel>
                          <FormControl>
                            <Input type='email' className='h-12' placeholder='请输入邮箱地址' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='sr-only'>验证码</FormLabel>
                          <Flex
                            justify='between'
                            align='center'
                            className='text-base border rounded-md border-input bg-transparent focus-within:outline-none focus-within:ring-1 focus-within:ring-ring'
                          >
                            <FormControl>
                              <Input
                                type='password'
                                className='h-12 border-none outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none'
                                placeholder='请输入验证码'
                                {...field}
                              />
                            </FormControl>
                            <Text
                              onClick={getSecurityCode}
                              className={`flex-0 text-nowrap bg-transparent text-sm p-2 cursor-pointer ${countdown === 0 ? '' : 'text-red-500'}`}
                            >
                              {countdown === 0 ? '获取验证码' : `${Math.round(countdown / 1000)}s 后重试`}
                            </Text>
                          </Flex>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {sent && (
                      <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='sr-only'>新密码</FormLabel>
                            <FormControl>
                              <Input type='password' className='h-12' placeholder='请输入新密码' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <div className='mt-5'>
                      <Button size='lg' disabled={loading} className='block w-full'>
                        提交
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
              <div className='pt-6 text-center text-sm text-gray-600 space-x-0.5'>
                <Text>注册/登录即表示同意</Text>
                <Link href='/terms' className='text-blue-500 hover:underline'>
                  用户协议
                </Link>
                <Text>和</Text>
                <Link href='/privacy' className='text-blue-500 hover:underline'>
                  隐私政策
                </Link>
              </div>
            </Card>
          </Container>
        </Box>
        <Flex className='my-1 flex items-center justify-center text-sm text-gray-600'>
          <Link
            href='/'
            target='_blank'
            rel='noreferrer nofollow'
            className='mx-0.5 text-blue-500 underline hover:text-blue-700'
          >
            粤ICP备XXXX号
          </Link>
          <Separator.Root decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-200' />
          <Link href='/' className='mx-0.5'>
            © All rights reserved. Blogs Powered by: blogs
          </Link>
          <Separator.Root decorative orientation='vertical' className='mx-2 h-4 w-0.5 bg-gray-200' />
          <Text>版本: v{version}</Text>
        </Flex>
      </Flex>
    </>
  )
}

export default Page
