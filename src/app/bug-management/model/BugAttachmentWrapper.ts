import {Bug} from './bug.model';
import {Attachment} from './attachment.model';

export interface BugAttachmentWrapper {
  bug: Bug;
  attachment: Attachment;
  token: string;
}
