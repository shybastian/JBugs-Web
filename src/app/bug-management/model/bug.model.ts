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
  created_ID: User;
  assigned_ID: User;
}
