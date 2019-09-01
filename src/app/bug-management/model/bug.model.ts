import {User} from '../../user-management/models/user.model';
import {Attachment} from "./attachment.model";

// Bug View
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

// Bug Create AND update
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

// BugWrapper
export interface BugUpdateWrapper {
  bugDTO: BugModel;
  token: string;
}

export interface BugUpdateWrapperWithAtt {
  bugDTO: BugModel;
  token: string;
  attachment: Attachment;
}

// Bug-View to create BugUpdate
export interface BugUpdate {
  title: string;
  description: string;
  version: string;
  targetDate: string;
  status: string;
  fixedVersion: string;
  severity: string;
}
