import {Appointment} from "./Appointment";
import {ScheduleDay} from "./ScheduleDay";
import {Specialization} from "./Specialization";

export class Doctor {
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  patronymic: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  experience: string | undefined;
  specializations: Specialization[] | undefined;
  scheduleDays: ScheduleDay[] | undefined;
  appointments: Appointment[] | undefined;

  constructor() {
  }
}
