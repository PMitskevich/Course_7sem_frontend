import {Specialization} from "./Specialization";

export class MedicalServiceEntity {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  specialization: Specialization | undefined;

  constructor() {
  }
}
