'use client'
import { CoreDrawer } from '@/components/app/cores'

import { ServerError, useLazyQuery } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Flex, Spinner, Text } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { Switch } from '@components/ui/switch'
import { CoresDocument } from '@generated/graphql'

import { toast } from 'react-toastify'

import { API } from '/#/api'

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState(false)
  const [fetch, { data, error, refetch }] = useLazyQuery(CoresDocument, {
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

  const [cores, setCores] = useState<API.Core[]>([])
  useEffect(() => {
    if (data?.cores) {
      setCores(data.cores as API.Core[])
      setLoading(false)
    }
  }, [data])

  const [core, setCore] = useState<API.Core | null>(null)
  const onSelect = (item: API.Core | null) => {
    setCore(item)
    setOpen(true)
  }

  return (
    <>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='space-y-0.5 flex justify-between items-center'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>系统列表</h2>
            <p className='text-muted-foreground'>管理应用中所有已配置的系统或模块.</p>
          </div>
          <div className='space-x-1.5'>
            <Button variant='outline' size='sm' onClick={() => onSelect(null)}>
              <Plus />
              <Text>添加系统</Text>
            </Button>
          </div>
        </div>
        <Separator />
        <div className='space-y-4 lg:space-y-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>系统名称</TableHead>
                <TableHead>系统标识</TableHead>
                <TableHead>系统描述</TableHead>
                <TableHead>是否显示</TableHead>
                <TableHead>排序值</TableHead>
                <TableHead>系统图片</TableHead>
                <TableHead className='text-right'>操 作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Flex justify='center' className='w-full py-10 mx-auto'>
                      <Spinner size='3' />
                    </Flex>
                  </TableCell>
                </TableRow>
              ) : cores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className='bg-gray-50'>
                    <Flex justify='center' className='w-full py-44 mx-auto'>
                      暂无数据
                    </Flex>
                  </TableCell>
                </TableRow>
              ) : (
                cores.map(core => (
                  <TableRow key={core.id}>
                    <TableCell className='font-medium'>{core.id}</TableCell>
                    <TableCell>{core.display_name}</TableCell>
                    <TableCell>{core.name}</TableCell>
                    <TableCell>{core.description}</TableCell>
                    <TableCell>
                      <Switch checked={core.is_visible} aria-readonly='true' />
                    </TableCell>
                    <TableCell>{core.sort_id}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className='text-right'>
                      <Button variant='outline' size='sm' onClick={() => onSelect(core)}>
                        编 辑
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CoreDrawer open={open} setOpen={setOpen} item={core} refetch={refetch} />
    </>
  )
}

export default Page
