import {User} from "./User";
import {Animal} from "./Animal";
import {Appointment} from "./Appointment";

export class Owner {
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  patronymic: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  user: User | undefined;
  animals: Animal[] | undefined;
  appointments: Appointment[] | undefined;

  constructor() {
  }
}
