'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { ServerError, useMutation } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { Checkbox } from 'antd'
import { toast } from 'react-toastify'

import { UpdateRolePermissionsDocument } from '@generated/graphql'

import { useStore } from '@/store'
import { useEffect, useState } from 'react'
import { API } from '/#/api'

type Props = {
  permissionTypes: API.PermissionType[]
  item: API.Role | null
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
}

const RoleDrawer = ({ permissionTypes, item, open, setOpen, refetch }: Props) => {
  const getProfile = useStore(state => state.getProfile)

  const [fetch, { loading }] = useMutation(UpdateRolePermissionsDocument, {
    variables: { id: 0, input: [] },
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

  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectIds, setSelectIds] = useState<number[]>([])

  useEffect(() => {
    const results = permissionTypes.map(item => (item?.permissions ? item?.permissions.map(item => item.id) : []))
    setSelectAll(selectIds.length === results.flatMap(item => item).length)
  }, [selectIds])

  const onSubmit = async () => {
    if (item === null) return

    await fetch({ variables: { id: item.id, input: selectIds } })
  }

  useEffect(() => {
    const results = permissionTypes.map(item => (item?.permissions ? item?.permissions.map(item => item.id) : []))

    setSelectIds(item?.permission_ids ?? [])
    setSelectAll(selectIds.length === results.flatMap(item => item).length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, permissionTypes, open])

  /**
   * Handles the selection or deselection of all permissions.
   * When checked, selects all permission IDs; otherwise, clears the selection.
   * @param {boolean} checked - Whether all permissions should be selected
   */
  const onSelectAll = (checked: boolean) => {
    if (checked) {
      const results = permissionTypes.map(item => (item?.permissions ? item?.permissions.map(item => item.id) : []))
      setSelectIds(results.flatMap(item => item))
    } else {
      setSelectIds([])
    }
    setSelectAll(checked)
  }

  /**
   * Callback for when a checkbox is checked or unchecked.
   * @param {boolean} checked - Whether the checkbox is checked
   * @param {number} id - The id of the permission
   */
  const onChecked = (checked: boolean, id: number) => {
    if (checked) {
      setSelectIds([...selectIds, id])
    } else {
      setSelectIds(selectIds.filter(item => item !== id))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-screen-lg w-full'>
        <DialogHeader>
          <DialogTitle>权限管理</DialogTitle>
          <DialogDescription>
            <div className='flex justify-between items-center'>
              <span>新增加的角色需要重新赋予权限跟菜单，才能生效.</span>
              <Checkbox checked={selectAll} onChange={e => onSelectAll(e.target.checked)}>
                全选
              </Checkbox>
            </div>
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>ID</TableHead>
              <TableHead>权限列表</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissionTypes.map(item => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item?.display_name}</TableCell>
                <TableCell className='font-medium'>
                  <div className='flex gap-x-2'>
                    {item?.permissions &&
                      item.permissions.map(permission => (
                        <Checkbox
                          onChange={e => onChecked(e.target.checked, permission.id)}
                          checked={selectIds.includes(permission.id)}
                          key={permission.id}
                        >
                          {permission.display_name}
                        </Checkbox>
                      ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex justify-end items-center gap-5 pt-5'>
          <Button disabled={loading} type='button' variant='outline' size='lg' onClick={() => setOpen(false)}>
            取 消
          </Button>
          <Button disabled={loading || selectIds.length === 0} size='lg' type='button' onClick={onSubmit}>
            保 存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RoleDrawer
