'use client'

import { ServerError, useLazyQuery } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Flex, Spinner, Text } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { AccountDrawer } from '@/components/app/accounts'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { API } from '/#/api'

import { PermissionEnum } from '@/enums/permissionEnum'
import { usePermission } from '@/hooks/user-permission'

import { AccountsDocument } from '@generated/graphql'

const Page = () => {
  const { hasPermission } = usePermission()

  const [loading, setLoading] = useState<boolean>(true)
  const [accounts, setAccounts] = useState<API.Account[]>([])

  const [fetch, { data, refetch }] = useLazyQuery(AccountsDocument, {
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

  const [platformTypes, setPlatformTypes] = useState<API.PlatformType[]>([])
  useEffect(() => {
    setAccounts((data?.accounts as API.Account[]) ?? [])
    setPlatformTypes((data?.platformTypes as API.PlatformType[]) ?? [])
    setLoading(false)
  }, [data])

  const [account, SetAccount] = useState<API.Account | null>(null)
  const [open, setOpen] = useState(false)
  const openAccountDrawer = (item: API.Account | null) => {
    if (!hasPermission([PermissionEnum.ACCOUNTS_ACTION_UPDATE])) {
      return
    }

    SetAccount(item)
    setOpen(true)
  }

  return (
    <>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='space-y-0.5 flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-bold tracking-tight'>应用中心</h2>
            <p className='text-muted-foreground text-sm'>这里有你想知道的一切！</p>
          </div>
          {hasPermission([PermissionEnum.ACCOUNTS_ACTION_CREATE]) && (
            <Button variant='outline' size='sm' onClick={() => openAccountDrawer(null)}>
              <Plus />
              <Text>新 增</Text>
            </Button>
          )}
        </div>
        <Separator />
        <div className='space-y-4'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>应用名称</TableHead>
                <TableHead>应用标识</TableHead>
                <TableHead>应用凭据</TableHead>
                <TableHead>应用密钥</TableHead>
                <TableHead>回调地址</TableHead>
                <TableHead className='text-right'>操 作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Flex justify='center' className='w-full py-10 mx-auto'>
                      <Spinner size='3' />
                    </Flex>
                  </TableCell>
                </TableRow>
              ) : accounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='bg-gray-50'>
                    <Flex justify='center' className='w-full py-44 mx-auto'>
                      暂无数据
                    </Flex>
                  </TableCell>
                </TableRow>
              ) : (
                accounts.map(account => (
                  <TableRow key={account.id}>
                    <TableCell className='font-medium'>{account.id}</TableCell>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.app}</TableCell>
                    <TableCell>{account.appid}</TableCell>
                    <TableCell>{account?.app_secret}</TableCell>
                    <TableCell>{account?.callback_url}</TableCell>
                    <TableCell className='text-right'>
                      {hasPermission([PermissionEnum.ACCOUNTS_ACTION_UPDATE]) && (
                        <Button variant='outline' size='sm' onClick={() => openAccountDrawer(account)}>
                          编 辑
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AccountDrawer platformTypes={platformTypes} open={open} setOpen={setOpen} item={account} refetch={refetch} />
    </>
  )
}

export default Page
