/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Signatory } from '@cakioe/kit.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { useCountDown, useUnmount } from 'ahooks'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStore } from '@/store'

import { appid } from '@config/index'
import { CodeDocument, SignupDocument } from '@generated/graphql'

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
  })
})

const RuiLogin = () => {
  const app = useStore(state => state.app)
  const signer = new Signatory(appid)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
  const [fetchCode] = useMutation(CodeDocument, {
    variables: { input: '' },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      setTargetDate(undefined)
      toast.error(errors[0].message)
    },
    onCompleted: () => {
      toast.success('验证码已经发送到您的邮箱')
      setTargetDate(Date.now() + 60000)
    }
  })

  const getSecurityCode = async () => {
    const email = form.getValues().email
    if (email === '') {
      toast.error('请输入邮箱地址')
      return
    }
    const payload = signer.toBase64String({ email: email, action_type: 'register' })
    await fetchCode({ variables: { input: payload } })
  }

  const [fetch, { loading, data }] = useMutation(SignupDocument, {
    variables: { input: '' },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = signer.toBase64String({ app: app, ...values, method: 'sms' })
    await fetch({ variables: { input: payload } })
  }

  const login = useStore(state => state.login)
  if (data) {
    toast.success('登录成功')
    login(data.signup)
    // NOTE: 获取用户信息
    return redirect('/')
  }

  return (
    <>
      <Heading as='h3' className='mb-4 text-base font-bold leading-none'>
        验证码登录 / 注册
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
            name='security_code'
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
          <div className='mt-5'>
            <Button size='lg' disabled={loading} className='block w-full'>
              登录 / 注册
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default RuiLogin
