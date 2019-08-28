import {User} from "../../user-management/models/user.model";
import {Bug} from "./bug.model";

export interface BugViewList {
  bugDTOList: Bug[];
  userDTOList: User[];
}
