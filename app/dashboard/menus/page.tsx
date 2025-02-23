'use client'

import { ServerError, useLazyQuery } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Flex, Spinner, Text } from '@radix-ui/themes'

import type { TreeDataNode, TreeProps } from 'antd'

import { Tree } from 'antd'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { MenuDrawer } from '@/components/app/menus'

import { Button } from '@components/ui/button'
import { MenusDocument } from '@generated/graphql'

import { PermissionEnum } from '@/enums/permissionEnum'
import { usePermission } from '@/hooks/user-permission'

import { API } from '/#/api'

const Page = () => {
  const { hasPermission } = usePermission()

  const [loading, setLoading] = useState<boolean>(true)
  const [menus, setMenus] = useState<TreeDataNode[]>([])

  const [fetch, { data, refetch }] = useLazyQuery(MenusDocument, {
    variables: { input: '' },
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
    setMenus((data?.menus as unknown as TreeDataNode[]) ?? [])
    setLoading(false)
  }, [data])

  const [menu, setMenu] = useState<API.Menu | null>(null)
  const [open, setOpen] = useState(false)
  const openMenuDrawer = (item: API.Menu | null) => {
    setMenu(item)
    setOpen(true)
  }

  const onSelect: TreeProps['onSelect'] = (_, { node }) => {
    if (!hasPermission([PermissionEnum.MENUS_ACTION_UPDATE])) {
      return
    }

    openMenuDrawer(node as unknown as API.Menu)
  }
  return (
    <>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='space-y-0.5 flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-bold tracking-tight'>菜单管理</h2>
            <p className='text-muted-foreground text-sm'>从菜单列表选择一项后，进行编辑</p>
          </div>
          {hasPermission([PermissionEnum.MENUS_ACTION_CREATE]) && (
            <Button variant='outline' size='sm' onClick={() => openMenuDrawer(null)}>
              <Plus />
              <Text>新 增</Text>
            </Button>
          )}
        </div>
        <div className='space-y-4 lg:space-y-0'>
          {loading ? (
            <Flex justify='center' className='w-full py-10 mx-auto'>
              <Spinner size='3' />
            </Flex>
          ) : menus.length === 0 ? (
            <div className='text-muted-foreground text-sm'>没有菜单</div>
          ) : (
            <div className='bg-background'>
              <div className='grid lg:grid-cols-5'>
                <div className='pb-12 hidden lg:block'>
                  <div className='space-y-4 pb-4'>
                    <div className='px-3 py-2'>
                      <h2 className='my-2 px-4 text-lg font-bold tracking-tight'>所有菜单</h2>
                      <div className='space-y-1'>
                        <Tree
                          showLine
                          fieldNames={{
                            title: 'display_name',
                            key: 'id',
                            children: 'children'
                          }}
                          defaultExpandAll
                          autoExpandParent
                          onSelect={onSelect}
                          treeData={menus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-3 lg:col-span-4'></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <MenuDrawer item={menu} open={open} menus={menus as unknown as API.Menu[]} setOpen={setOpen} refetch={refetch} />
    </>
  )
}

export default Page
