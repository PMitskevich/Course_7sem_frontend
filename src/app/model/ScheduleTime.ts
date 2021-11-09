import {Time} from "@angular/common";
import {ScheduleDay} from "./ScheduleDay";

export class ScheduleTime {
  id: string | undefined;
  time: Time | undefined;
  isBlocked: boolean | undefined;
  scheduleDay: ScheduleDay | undefined;

  constructor() {
  }
}
