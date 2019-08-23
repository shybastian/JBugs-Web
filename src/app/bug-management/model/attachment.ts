import {Bug} from './bug.model';

export interface Attachment {
  ID: number;
  attContent: any;
  bugID: Bug;
}

// modified attContent from 'string' to File.
