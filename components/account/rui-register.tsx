/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Signatory } from '@cakioe/kit.js'
import * as Form from '@radix-ui/react-form'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { useCountDown, useUnmount } from 'ahooks'
import { redirect } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { useStore } from '@/store'

import { appid } from '@config/index'
import { CodeDocument, SignupDocument } from '@generated/graphql'

type FormProps = {
  email: string
  security_code: string
}

const RuiLogin = () => {
  const app = useStore(state => state.app)
  const signer = new Signatory(appid)
  const [formValues, setFormValues] = useState<FormProps>({
    email: '',
    security_code: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    email: null,
    security_code: null
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
      setFormValues({
        ...formValues,
        security_code: ''
      })
    }
  })

  const getSecurityCode = async () => {
    if (!formValues.email) {
      toast.error('请输入邮箱地址')
      return
    }

    const payload = signer.toBase64String({ email: formValues.email, action_type: 'register' })
    await fetchCode({
      variables: { input: payload },
      context: {
        headers: {
          appid: appid
        }
      }
    })
  }

  const [fetch, { loading, data }] = useMutation(SignupDocument, {
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
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = signer.toBase64String({ app: app, ...formValues, method: 'sns' })
    await fetch({
      variables: { input: payload },
      context: {
        headers: {
          appid: appid
        }
      }
    })
    // setFormValues({ email: '', password: '' })
    // setErrors({ email: null, password: null })
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
      <Form.Root className='w-full space-y-2 text-sm' autoCapitalize='off' onSubmit={onSubmit}>
        <Form.Field name='email'>
          <Flex justify='between' align='center' className='text-base'>
            <Form.Label className='mb-1.5'></Form.Label>
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
        <Form.Field name='password'>
          <Flex justify='between' align='center' className='text-base'>
            <Form.Label className='mb-1.5'></Form.Label>
          </Flex>
          <Flex
            justify='between'
            align='center'
            className={`text-base border bg-white outline-none focus-within:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
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
          {errors.security_code && <Form.Message className='text-red-600'>{errors.security_code}</Form.Message>}
        </Form.Field>
        <div className='pt-5'>
          <Button disabled={loading} className='block w-full'>
            登录 / 注册
          </Button>
        </div>
      </Form.Root>
    </>
  )
}

export default RuiLogin
