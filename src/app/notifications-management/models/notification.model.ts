import {User} from "../../user-management/models/user.model";

export interface Notification {
  id: number;
  date: string;
  message: string;
  type: string;
  url: string;
  user: User;
}

