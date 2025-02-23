/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Signatory } from '@cakioe/kit.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStore } from '@/store'

import { appid } from '@config/index'
import { LoginDocument } from '@generated/graphql'

type Props = {
  onReset: (method: 'sms' | 'password') => void
}

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
  password: z.string().min(6, {
    message: '密码至少6位'
  })
})

const RuiRegister = ({ onReset }: Props) => {
  const app = useStore(state => state.app)
  const signer = new Signatory(appid)
  const [fetch, { loading, data }] = useMutation(LoginDocument, {
    variables: { input: '' },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      if (errors) {
        toast.error(errors[0].message)
      }
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = signer.toBase64String({ app: app, ...values, method: 'password' })
    await fetch({ variables: { input: payload } })
  }

  const login = useStore(state => state.login)
  if (data) {
    toast.success('登录成功')
    login(data.login)
    // NOTE: 获取用户信息
    return redirect('/')
  }

  return (
    <>
      <Heading as='h3' className='mb-4 text-base font-bold leading-none'>
        密码登录
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
                <FormLabel className='sr-only'>登录密码</FormLabel>
                <Flex
                  justify='between'
                  align='center'
                  className='text-base border rounded-md border-input bg-transparent focus-within:outline-none focus-within:ring-1 focus-within:ring-ring'
                >
                  <FormControl>
                    <Input
                      type='password'
                      className='h-12 border-none outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none'
                      placeholder='请输入登录密码'
                      {...field}
                    />
                  </FormControl>
                  <Link href='/forgot' className='flex-0 text-nowrap bg-transparent text-sm p-2 cursor-pointer'>
                    忘记密码
                  </Link>
                </Flex>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-5 mt-5'>
            <Button
              size='lg'
              disabled={loading}
              type='button'
              variant='outline'
              className='w-full'
              onClick={() => onReset('sms')}
            >
              注 册
            </Button>
            <Button size='lg' disabled={loading} type='submit' className='w-full'>
              登 录
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default RuiRegister
