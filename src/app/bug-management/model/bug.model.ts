import {User} from '../../user-management/models/user.model';

// Bug View
export interface Bug {
  ID: number;
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

// Bug Create
export interface BugModel {
  ID: number;
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
