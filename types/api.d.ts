import type { LucideIcon } from 'lucide-react'

export declare namespace API {
  export interface Permission {
    id: number
    name: string
    display_name: string
    is_visible: boolean
    sort_id: number
    type_id: number
    description: string
  }

  export interface PermissionType {
    id: number
    name: string
    display_name: string
    sort_id: number
    permissions?: Permission[]
    checkboxDisabled?: boolean
  }

  export interface Profile {
    id?: number
    email: string
    name: string
    username: string
    profile_url: string
    email_verified_at?: string // 邮箱验证日期
    status: string
    permissions?: string[]
    role?: Role
  }

  // 系统设置
  export interface Setting {
    title: string
    keywords?: string
    description?: string
    host?: string
    folder?: string
    file_group_id?: number
    email_driver?: string
    email_host?: string
    email_port?: number
    email_username?: string
    email_password?: string
    email_encryption?: string
    email_from_address?: string
    email_from_name?: string
    registrable: bool
  }

  export interface Account {
    id: number
    name: string
    app: string
    appid: string
    app_secret?: string | null
    callback_url?: string | null
    platform_type: number
  }

  export interface PlatformType {
    id: number
    name: string
  }

  export interface NavLink {
    title: string
    url: string
  }

  export interface NavItem {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: NavLink[]
  }

  export interface RoleMenuObject {
    selected_keys?: number[]
    indeterminate_keys?: number[]
  }

  export interface Role {
    id: number
    name: string
    display_name: string
    is_visible: boolean
    sort_id: number
    description: string
    permission_ids?: number[]
    menu_ids?: RoleMenuObject
  }

  export interface FileGroup {
    id: number
    group_name: string
    description: string
    parent_id: number
    sort_id: number
    files?: File[]
  }

  export interface File {
    id: number
    file_url: string
    user_id?: number
    file_name: string
    file_size: number
    file_type: string
    file_extension: string
    group_id?: number
    is_referenced: boolean
  }

  export interface Core {
    id: number
    name: string
    display_name: string
    description: string
    thumb?: string
    is_visible: boolean
    sort_id: number
  }

  export interface Menu {
    id: number
    name?: string
    display_name: string
    path?: string
    component?: string
    redirect?: string
    meta: MenuMeta
    parent_id?: number
    children?: Menu[]
    sort_id?: number
  }

  export interface MenuMeta {
    hidden?: boolean
    icon: string
    title: string
    affix?: boolean
    permissions?: string
    keep_alive?: boolean
  }

  export interface Page<T = any> {
    total: number
    current_page: number
    last_page: number
    per_page: number
    data: T[]
  }

  export interface Response<T = any> {
    code?: number
    message?: string
    data: T
  }
}
