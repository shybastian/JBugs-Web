import {BugModel} from './bug.model';
import {Attachment} from './attachment.model';

export interface BugAttachmentWrapper {
  bug: BugModel;
  attachment: Attachment;
  token: string;
}
