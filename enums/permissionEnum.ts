// SELECT CONCAT(description, ' = "', name, '",') AS description_output FROM permissions order by type_id;
export enum PermissionEnum {
  ROLES_ACTION_CREATE = 'roles.action.create',
  ROLES_ACTION_UPDATE = 'roles.action.update',
  ROLES_ACTION_DELETE = 'roles.action.delete',
  ROLES_ACTION_LIST = 'roles.action.list',
  ROLES_ACTION_REBINDING_PERMISSION = 'roles.action.rebinding.permission',
  ROLES_ACTION_REBINDING_MENU = 'roles.action.rebinding.menu',

  PERMISSIONS_ACTION_LIST = 'permissions.action.list',
  PERMISSIONS_ACTION_DELETE = 'permissions.action.delete',
  PERMISSIONS_ACTION_UPDATE = 'permissions.action.update',
  PERMISSIONS_ACTION_CREATE = 'permissions.action.create',

  MENUS_ACTION_DELETE = 'menus.action.delete',
  MENUS_ACTION_LIST = 'menus.action.list',
  MENUS_ACTION_UPDATE = 'menus.action.update',
  MENUS_ACTION_CREATE = 'menus.action.create',

  USERS_ACTION_CHANGE_PASSWORD = 'users.action.change.password',
  USERS_ACTION_UPDATE_PROFILE_URL = 'users.action.update.profile_url',
  USERS_ACTION_REBINDING_ROLE = 'users.action.rebinding.role',

  SETTINGS_ACTION_FETCH = 'settings.action.fetch',
  SETTINGS_ACTION_UPDATE = 'settings.action.update',
  SETTINGS_ACTION_CREATE = 'settings.action.create',
  SETTINGS_ACTION_DELETE = 'settings.action.delete',

  ACCOUNTS_ACTION_UPDATE = 'accounts.action.update',
  ACCOUNTS_ACTION_DELETE = 'accounts.action.delete',
  ACCOUNTS_ACTION_LIST = 'accounts.action.list',
  ACCOUNTS_ACTION_CREATE = 'accounts.action.create'
}
