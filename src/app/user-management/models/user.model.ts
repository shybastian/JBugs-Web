export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  counter: number;
  email: string;
  mobileNumber: string;
  status: number;
  roles: Role[];
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
  hashedPassword: string;
}
