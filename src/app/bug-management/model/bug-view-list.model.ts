import {Bug} from "./bug.model";
import {User} from "../../user-management/models/user.model";

export interface BugViewList {
  bugDTOList: Bug[];
  userDTOList: User[];
}
