import {Owner} from "./Owner";
import {Animal} from "./Animal";
import {Doctor} from "./Doctor";

export class Appointment {
  id: string | undefined;
  doctor: Doctor | undefined;
  owner: Owner | undefined;
  animal: Animal | undefined;
  dateTime: Date | undefined;

  constructor() {
  }
}
