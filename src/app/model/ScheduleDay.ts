import {Doctor} from "./Doctor";
import {ScheduleTime} from "./ScheduleTime";

export class ScheduleDay {
  id: string | undefined;
  date: Date | undefined;
  isBlocked: boolean | undefined;
  doctor: Doctor | undefined;
  scheduleTimes: ScheduleTime[] | undefined;

  constructor() {
  }
}
