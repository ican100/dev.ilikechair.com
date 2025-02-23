import { useStore } from '@/store'

export function usePermission() {
  const permissions = useStore.getState().getPermissions()

  function _somePermissions(accesses: string[]) {
    return permissions.some((item: string) => {
      return accesses.includes(item)
    })
  }

  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length) return true
    return _somePermissions(accesses)
  }

  return { hasPermission }
}
