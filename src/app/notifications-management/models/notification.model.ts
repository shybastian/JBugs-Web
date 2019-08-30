import {User} from "../../user-management/models/user.model";

export interface Notification {
  id: number;
  date: string;
  message: string;
  type: NotificationType;
  url: string;
  user: User;
}

export enum NotificationType {
  WELCOME_NEW_USER = "WELCOME_NEW_USER", USER_UPDATED = "USER_UPDATED", USER_DELETED = "USER_DELETED", BUG_UPDATED = "BUG_UPDATED",
  BUG_CLOSED = "BUG_CLOSED", BUG_STATUS_UPDATED = "BUG_STATUS_UPDATED", USER_DEACTIVATED = "USER_DEACTIVATED"
}
