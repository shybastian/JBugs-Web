import {Bug} from './bug.model';

export interface Attachment {
  ID: number;
  attContent: string;
  bugID: Bug;
}
