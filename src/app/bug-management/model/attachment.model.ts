import {Bug, BugModel} from './bug.model';

export interface Attachment {
  ID: number;
  attContent: string;
  bugID: BugModel;
}

export interface AttachmentView {
  id: number;
  attContent: string;
  bugID: Bug;
}

