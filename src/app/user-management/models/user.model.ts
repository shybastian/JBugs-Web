import {Role} from './role';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobileNumber: string;
  status: number;
  roles: Role[];
}

export interface UserToSaveOnSession {
  // id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobileNumber: string;
  permissions: PermissionType[];
  token: string;
  message: string;
}

export interface Role {
  id: number;
  type: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  type: string;
  description: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export enum UserStatusType {
  Active = 0,
  Inactive = 1
}

export enum RoleType {
  ADM = 'Administrator',
  PM = 'Project manager',
  TM = 'Test manager',
  DEV = 'Developer',
  TEST = 'Tester'
}

export enum PermissionType {
  PERMISSION_MANAGEMENT = 'PERMISSION_MANAGEMENT',
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  BUG_MANAGEMENT = 'BUG_MANAGEMENT',
  BUG_CLOSE = 'BUG_CLOSE',
  BUG_EXPORT_PDF = 'BUG_EXPORT_PDF',
  CURRENT_USER = 'CURRENT_USER' // ? pt a vizualiza notificarile...
}

export interface RoleWrapper {
  id: number;
  type: string;
  role: Role;
}

export interface UserInsertWrapper {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  roles: RoleWrapper[];
}

