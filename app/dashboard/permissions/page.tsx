'use client'

import { ServerError, useLazyQuery } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Flex, Spinner, Text } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PermissionDrawer, TypeDrawer } from '@/components/app/permissions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { API } from '/#/api'

import { PermissionEnum } from '@/enums/permissionEnum'
import { usePermission } from '@/hooks/user-permission'

import { PermissionTypesDocument } from '@generated/graphql'

const Page = () => {
  const { hasPermission } = usePermission()
  const [loading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState(false)
  const [fetch, { data, error, refetch }] = useLazyQuery(PermissionTypesDocument, {
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

  const [types, setTypes] = useState<API.PermissionType[]>([])
  useEffect(() => {
    if (data?.permissionTypes) {
      setTypes(data.permissionTypes as API.PermissionType[])
      setLoading(false)
    }
  }, [data])

  const [permission, setPermission] = useState<API.Permission | null>(null)
  const onSelect = (item: API.Permission | null) => {
    if (!hasPermission([PermissionEnum.PERMISSIONS_ACTION_UPDATE, PermissionEnum.PERMISSIONS_ACTION_DELETE])) {
      return
    }

    setPermission(item)
    setOpen(true)
  }

  return (
    <>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='space-y-0.5 flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-bold tracking-tight'>权限列表</h2>
            <p className='text-muted-foreground text-sm'>
              默认所有权限显示, 红色按钮为隐藏状态，在获取时隐藏状态则不会显示
            </p>
          </div>
          <div className='space-x-1.5'>
            {hasPermission([PermissionEnum.PERMISSIONS_ACTION_CREATE]) && (
              <TypeDrawer refetch={refetch} types={types} />
            )}
            {types.length > 0 && hasPermission([PermissionEnum.PERMISSIONS_ACTION_CREATE]) && (
              <Button variant='outline' size='sm' onClick={() => onSelect(null)}>
                <Plus />
                <Text>创建权限</Text>
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div className='space-y-4'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>分类</TableHead>
                <TableHead>操作权限</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Flex justify='center' className='w-full py-10 mx-auto'>
                      <Spinner size='3' />
                    </Flex>
                  </TableCell>
                </TableRow>
              ) : types.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className='bg-gray-50'>
                    <Flex justify='center' className='w-full py-44 mx-auto'>
                      暂无数据
                    </Flex>
                  </TableCell>
                </TableRow>
              ) : (
                types.map(role => (
                  <TableRow key={role.id}>
                    <TableCell>{role.display_name}</TableCell>
                    <TableCell className='space-x-1.5'>
                      {role?.permissions &&
                        role?.permissions.map(permission => (
                          <Button
                            key={permission.id}
                            variant='outline'
                            size='sm'
                            className={`shadow-none ${permission.is_visible ? '' : 'border-red-500 text-red-500 hover:text-red-600'}`}
                            onClick={() => onSelect(permission)}
                          >
                            {permission.display_name}
                          </Button>
                        ))}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <PermissionDrawer open={open} setOpen={setOpen} permission={permission} refetch={refetch} types={types} />
    </>
  )
}

export default Page
