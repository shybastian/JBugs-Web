export interface PermissionDTO {
  id: number;
  type: string;
}


export enum Permission {
  PERMISSION_MANAGEMENT = "PERMISSION_MANAGEMENT", USER_MANAGEMENT = "USER_MANAGEMENT", BUG_MANAGEMENT = "BUG_MANAGEMENT",
  BUG_CLOSE = "BUG_CLOSE", BUG_EXPORT_PDF = "BUG_EXPORT_PDF"
}

export interface PermissionsWrapper {
  roleId: number;
  permissions: PermissionDTO[];
}
