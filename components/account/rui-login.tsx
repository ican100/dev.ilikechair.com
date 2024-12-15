/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Signatory } from '@cakioe/kit.js'
import * as Form from '@radix-ui/react-form'
import { Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { useStore } from '@/store'

import { appid } from '@config/index'
import { LoginDocument } from '@generated/graphql'

type Props = {
  onReset: (method: 'sms' | 'password') => void
}

type FormProps = {
  email: string
  password: string
}

const RuiRegister = ({ onReset }: Props) => {
  const app = useStore(state => state.app)
  const signer = new Signatory(appid)
  const [fetch, { loading, data }] = useMutation(LoginDocument, {
    variables: { input: '' },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    }
  })

  const [formValues, setFormValues] = useState<FormProps>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    email: null,
    password: null
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let newErrors = {}
    if (!formValues.email) {
      newErrors = { ...newErrors, email: '请输入邮箱地址' }
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors = { ...newErrors, email: '请输入正确的邮箱地址' }
    }

    if (!formValues.password) {
      newErrors = { ...newErrors, password: '请输入密码或验证码' }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = signer.toBase64String({ app: app, ...formValues, method: 'password' })
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
    login(data.login)
    // NOTE: 获取用户信息
    return redirect('/')
  }

  return (
    <>
      <Heading as='h3' className='mb-4 text-base font-bold leading-none'>
        密码登录
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
                  password: e.target.value
                }))
              }
            >
              <input
                className='h-12 w-full rounded-sm border-none outline-none focus:outline-none p-2 flex-auto bg-transparent'
                type='password'
                required
                value={formValues.password}
              />
            </Form.Control>
            <Link href='/forgot' className='flex-0 text-nowrap bg-transparent text-sm p-2 cursor-pointer'>
              忘记密码
            </Link>
          </Flex>
          {errors.password && <Form.Message className='text-red-600'>{errors.password}</Form.Message>}
        </Form.Field>

        <div className='grid grid-cols-2 gap-4 pt-5'>
          <Button variant='outline' onClick={() => onReset('sms')}>
            注册
          </Button>
          <Button disabled={loading}>登录</Button>
        </div>
      </Form.Root>
    </>
  )
}

export default RuiRegister
