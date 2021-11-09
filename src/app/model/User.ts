import {Role} from "./Role";
import {Status} from "./Status";
import {Owner} from "./Owner";
import {Review} from "./Review";

export class User {
  id: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: Role | undefined;
  status: Status | undefined;
  owner: Owner | undefined;
  reviews: Review[] | undefined;

  constructor() {
  }
}
