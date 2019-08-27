import {User} from '../../user-management/models/user.model';

export interface Bug {
  id: number;
  title: string;
  description: string;
  version: string;
  targetDate: string;
  status: string;
  fixedVersion: string;
  severity: string;
  CREATED_ID: User;
  ASSIGNED_ID: User;
}
