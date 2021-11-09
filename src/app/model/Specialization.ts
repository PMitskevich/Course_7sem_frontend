import {Doctor} from "./Doctor";
import {MedicalServiceEntity} from "./MedicalServiceEntity";

export class Specialization {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  doctor: Doctor | undefined;
  medicalServiceEntities: MedicalServiceEntity[] | undefined;

  constructor() {
  }
}
