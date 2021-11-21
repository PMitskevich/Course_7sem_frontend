import {Component, Input, OnInit} from '@angular/core';
import {Specialization} from "../model/Specialization";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {priceNotNegativeOrZero} from "../service/validators";
import {Constants} from "../constant/Constants";
import {MedicalServiceEntity} from "../model/MedicalServiceEntity";

@Component({
  selector: 'app-medical-service-constructor',
  templateUrl: './medical-service-constructor.component.html',
  styleUrls: ['./medical-service-constructor.component.css']
})
export class MedicalServiceConstructorComponent implements OnInit {

  @Input()
  specialization: Specialization;
  @Input()
  specializationForm: FormGroup;
  medicalServiceEntityForm: FormGroup;
  requiredFieldMessage = Constants.REQUIRED_FIELD_MESSAGE;
  priceShouldBeGreaterZeroMessage = Constants.NEGATIVE_OR_ZERO_PRICE_MESSAGE;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.medicalServiceEntityForm = this.createMedicalServiceEntityForm('', null);
  }

  createMedicalServiceEntityForm(name: string, price: number): FormGroup {
    return this.formBuilder.group({
      name: [name, [Validators.required]],
      price: [price, [Validators.required]]
    }, {validators: priceNotNegativeOrZero('price')});
  }

  addMedicalService(): void {
    if (this.medicalServiceEntityForm.valid) {
      let name = this.medicalServiceEntityForm.get('name').value;
      let price = this.medicalServiceEntityForm.get('price').value;

      let medicalServiceEntity = new MedicalServiceEntity();
      // medicalServiceEntity.specialization = this.specialization;
      medicalServiceEntity.name = name;
      medicalServiceEntity.price = price;
      if (!this.specialization.medicalServiceEntities) {
        this.specialization.medicalServiceEntities = [];
      }
      this.specialization.medicalServiceEntities.push(medicalServiceEntity);
      this.addMedicalServiceEntityToArrayForm(name, price);
      this.medicalServiceEntityForm.get('name').reset();
      this.medicalServiceEntityForm.get('price').reset();
    }
  }

  addMedicalServiceEntityToArrayForm(name: string, price: number): void {
    let medicalServiceEntities = this.specializationForm.get('medicalServiceEntities');
    if (medicalServiceEntities instanceof FormArray) {
      let medicalServiceEntity = this.createMedicalServiceEntityForm(name, price);
      medicalServiceEntities.push(medicalServiceEntity);
    }
  }
}
