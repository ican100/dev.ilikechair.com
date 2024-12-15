/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Signatory } from '@cakioe/kit.js'
import * as Form from '@radix-ui/react-form'
import * as Separator from '@radix-ui/react-separator'
import { Box, Card, Container, Flex, Heading, Strong, Text } from '@radix-ui/themes'
import { useCountDown, useUnmount } from 'ahooks'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { useStore } from '@/store'

import { appid, version } from '@config/index'
import { CodeDocument, ResetPasswordDocument } from '@generated/graphql'

type FormProps = {
  email: string
  security_code: string
  password: string
}

const Page = () => {
  const app = useStore(state => state.app)
  const signer = new Signatory(appid)
  const [formValues, setFormValues] = useState<FormProps>({
    email: '',
    security_code: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    email: null,
    security_code: null,
    password: null
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
      setFormValues({
        ...formValues,
        security_code: ''
      })
      setSent(true)
    }
  })

  const getSecurityCode = async () => {
    if (!formValues.email) {
      toast.error('请输入邮箱地址')
      return
    }

    const payload = signer.toBase64String({ email: formValues.email, action_type: 'reset' })
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let newErrors = {}
    if (!formValues.email) {
      newErrors = { ...newErrors, email: '请输入邮箱地址' }
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors = { ...newErrors, email: '请输入正确的邮箱地址' }
    }

    if (!formValues.security_code) {
      newErrors = { ...newErrors, security_code: '请输入验证码' }
    }

    if (!formValues.password) {
      newErrors = { ...newErrors, password: '请输入新密码' }
    } else if (formValues.password.length < 8) {
      newErrors = { ...newErrors, password: '密码长度至少为8位' }
    } else if (formValues.password.length > 16) {
      newErrors = { ...newErrors, password: '密码长度最多为16位' }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = signer.toBase64String({ app: app, ...formValues, method: 'reset' })
    await fetch({ variables: { input: payload } })
  }

  if (data && data.resetPassword) {
    toast.success('密码重置成功')
    setSent(false)
    setFormValues({
      email: '',
      security_code: '',
      password: ''
    })
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
                <Form.Root className='w-full space-y-2 text-sm' autoCapitalize='off' onSubmit={onSubmit}>
                  <Form.Field name='email'>
                    <Flex justify='between' align='center' className='text-base'>
                      <Form.Label className='mb-0.5 text-sm'>
                        <Text color='red' className='mr-0.5'>
                          *
                        </Text>
                        <Strong>邮箱地址</Strong>
                      </Form.Label>
                    </Flex>
                    <Form.Control
                      asChild
                      onChange={e =>
                        setFormValues(prev => ({
                          ...prev,
                          email: e.target.value
                        }))
                      }
                    >
                      <input
                        className={`h-12 p-2 w-full rounded-sm border bg-white outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                        type='text'
                        value={formValues.email}
                        required
                      />
                    </Form.Control>
                    {errors.email && <Form.Message className='text-red-600'>{errors.email}</Form.Message>}
                  </Form.Field>
                  <Form.Field name='security_code'>
                    <Flex justify='between' align='center' className='text-base'>
                      <Form.Label className='mb-0.5 text-sm'>
                        <Text color='red' className='mr-0.5'>
                          *
                        </Text>
                        <Strong>验证码</Strong>
                      </Form.Label>
                    </Flex>
                    <Flex
                      justify='between'
                      align='center'
                      className='text-base border bg-white outline-none focus-within:border-blue-500'
                    >
                      <Form.Control
                        asChild
                        onChange={e =>
                          setFormValues(prev => ({
                            ...prev,
                            security_code: e.target.value
                          }))
                        }
                      >
                        <input
                          className='h-12 w-full rounded-sm border-none outline-none focus:outline-none p-2 flex-auto bg-transparent'
                          type='text'
                          required
                          value={formValues.security_code}
                        />
                      </Form.Control>
                      <Text
                        onClick={getSecurityCode}
                        className={`flex-0 text-nowrap bg-transparent text-sm p-2 cursor-pointer ${countdown === 0 ? 'text-blue-500' : 'text-red-500'}`}
                      >
                        {countdown === 0 ? '获取验证码' : `${Math.round(countdown / 1000)}s 后重试`}
                      </Text>
                    </Flex>
                    {errors.security_code && (
                      <Form.Message className='text-red-600'>{errors.security_code}</Form.Message>
                    )}
                  </Form.Field>
                  {sent && (
                    <Form.Field name='password'>
                      <Flex justify='between' align='center' className='text-base'>
                        <Form.Label className='mb-0.5 text-sm'>
                          <Text color='red' className='mr-0.5'>
                            *
                          </Text>
                          <Strong>新密码</Strong>
                        </Form.Label>
                      </Flex>
                      <Form.Control
                        asChild
                        onChange={e =>
                          setFormValues(prev => ({
                            ...prev,
                            password: e.target.value
                          }))
                        }
                      >
                        <input
                          className={`h-12 p-2 w-full rounded-sm border bg-white outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                          type='password'
                          value={formValues.password}
                          required
                        />
                      </Form.Control>
                      {errors.password && <Form.Message className='text-red-600'>{errors.password}</Form.Message>}
                    </Form.Field>
                  )}

                  <div className='pt-5'>
                    <Button disabled={loading} className='block w-full'>
                      提交
                    </Button>
                  </div>
                </Form.Root>
              </div>
              <div className='pt-6 text-center text-sm text-gray-600 space-x-0.5'>
                <Text>注册登录即表示同意</Text>
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
