import {Bug} from './bug.model';
import {Attachment} from './attachment';

export interface BugAttachmentWrapper {
  bug: Bug;
  attachment: Attachment;
}
