import {Specialization} from "./Specialization";

export class MedicalServiceEntity {
  id: string | undefined;
  name: string | undefined;
  price: string | undefined;
  specialization: Specialization | undefined;

  constructor() {
  }
}
