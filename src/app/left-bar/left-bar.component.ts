import { Component, OnInit } from '@angular/core';
import {Specialization} from "../model/Specialization";
import {Doctor} from "../model/Doctor";
import {MedicalServiceEntity} from "../model/MedicalServiceEntity";

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {
  specializations: Specialization[] = [{
    id: "1",
    name: "Ратолог",
    description: "Врач, лечащий крыс",
    doctor: undefined,
    medicalServiceEntities: undefined
  }];

  constructor() { }

  ngOnInit(): void {
    // Написать логику, при которой из SpecializationService подтягивались бы специализации и заполнялся массив specializations
  }

}
