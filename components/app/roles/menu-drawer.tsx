'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import type { TreeDataNode, TreeProps } from 'antd'
import { Checkbox, Tree } from 'antd'
import { toast } from 'react-toastify'

import type { RoleMenuInput } from '@generated/graphql'
import { UpdateRoleMenusDocument } from '@generated/graphql'

import { useStore } from '@/store'
import { useEffect, useState } from 'react'
import { API } from '/#/api'

type Props = {
  menus: API.Menu[]
  item: API.Role | null
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
}

const RoleDrawer = ({ menus, item, open, setOpen, refetch }: Props) => {
  const getProfile = useStore(state => state.getProfile)

  const [fetch, { loading }] = useMutation(UpdateRoleMenusDocument, {
    variables: { id: 0, input: {} as RoleMenuInput },
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    },
    onCompleted: async () => {
      toast.success('保存成功')
      await getProfile()
      setOpen(false)
      setSelectAll(false)
      refetch()
    }
  })

  const getAllIds = (menus: API.Menu[], level = 0): number[] => {
    if (level >= 3) return [] as number[]
    return menus.flatMap(menu => {
      const childrenIds = menu.children ? getAllIds(menu.children, level + 1) : []
      return [menu.id, ...childrenIds] as number[]
    })
  }

  const size = getAllIds(menus).length ?? 0
  const [checkedKeys, setCheckedKeys] = useState<{ checked: number[]; halfChecked: number[] }>({
    checked: [],
    halfChecked: []
  })

  const [treeData, setTreeData] = useState<TreeDataNode[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(size === checkedKeys.checked.length)

  useEffect(() => {
    setTreeData(menus as unknown as TreeDataNode[])

    setCheckedKeys({
      checked: item?.menu_ids?.selected_keys ?? [],
      halfChecked: item?.menu_ids?.indeterminate_keys ?? []
    })

    setSelectAll(size === (item?.menu_ids?.selected_keys ?? []).length)
  }, [menus, item, open, size])

  const onSubmit = async () => {
    if (item === null) return

    const params: RoleMenuInput = {
      selected_keys: checkedKeys.checked,
      indeterminate_keys: checkedKeys.halfChecked
    }
    await fetch({ variables: { id: item.id, input: params } })
  }

  const onSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckedKeys({ checked: getAllIds(menus as API.Menu[]), halfChecked: [] })
    } else {
      setCheckedKeys({ checked: [], halfChecked: [] })
    }

    setSelectAll(checked)
  }

  const onCheck: TreeProps['onCheck'] = (values, e) => {
    const checked = values as unknown as number[]
    const halfChecked = e.halfCheckedKeys as unknown as number[]

    setCheckedKeys({ checked: checked, halfChecked: halfChecked })
    setSelectAll(size === checkedKeys.checked.length)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-screen-lg w-full'>
        <DialogHeader>
          <DialogTitle>菜单管理</DialogTitle>
          <DialogDescription className='flex justify-between items-center'>
            <span>新增加的角色需要重新赋予权限跟菜单，才能生效.</span>
            <Checkbox checked={selectAll} onChange={e => onSelectAll(e.target.checked)}>
              全选
            </Checkbox>
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-1'>
          <Tree
            checkable
            fieldNames={{
              title: 'display_name',
              key: 'id',
              children: 'children'
            }}
            defaultExpandAll
            autoExpandParent
            selectable={false}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
          />
        </div>
        <div className='flex justify-end items-center gap-5 pt-5'>
          <Button disabled={loading} type='button' variant='outline' size='lg' onClick={() => setOpen(false)}>
            取 消
          </Button>
          <Button disabled={loading || checkedKeys.checked.length === 0} size='lg' type='button' onClick={onSubmit}>
            保 存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RoleDrawer
