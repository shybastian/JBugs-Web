import {Role} from './role';

export interface User {
  id: number;

  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobileNumber: string;

  status: number;
  stringStatus: string;

  counter: number;
  roles: Role[];
}

export interface UserToSaveOnSession {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobileNumber: string;
  permissions: PermissionType[];
  token: string;
  messageCode: string;
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
  Active = 1,
  Inactive = 0
}

export enum UserStatusTypeSTRING {
  Active = 'Active',
  Inactive = 'Inactive'
}

export enum RoleType {
  ADMINISTRATOR = 'ADMINISTRATOR',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  TEST_MANAGER = 'TEST_MANAGER',
  DEVELOPER = 'DEVELOPER',
  TESTER = 'TESTER'
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

export interface UserEditWrapper {
  id: number,
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  username: string;
  password: string;
  roles: RoleDTO[];
  counter: number;
  status: number;
}

export interface RoleDTO {
  type: string;
}
