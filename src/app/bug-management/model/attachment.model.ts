import {BugModel} from './bug.model';

export interface Attachment {
  ID: number;
  attContent: string;
  bugID: BugModel;
}
