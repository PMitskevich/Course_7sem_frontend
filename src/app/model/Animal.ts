import { Gender } from "./Gender";
import {Owner} from "./Owner";
import {Appointment} from "./Appointment";

export class Animal {
  id: string | undefined;
  name: string | undefined;
  birthday: Date | undefined;
  breed: string | undefined;
  gender: Gender | undefined;
  owner: Owner | undefined;
  appointments: Appointment[] | undefined;

  constructor() {
  }
}
