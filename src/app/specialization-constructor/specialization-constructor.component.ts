import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Specialization} from "../model/Specialization";
import {SpecializationService} from "../service/specialization.service";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../constant/Constants";
import {priceNotNegativeOrZero} from "../service/validators";
import {CustomRouterService} from "../service/custom-router.service";

@Component({
  selector: 'app-specialization-constructor',
  templateUrl: './specialization-constructor.component.html',
  styleUrls: ['./specialization-constructor.component.css']
})
export class SpecializationConstructorComponent implements OnInit {

  specialization: Specialization;
  specializationForm: FormGroup;
  requiredFieldMessage = Constants.REQUIRED_FIELD_MESSAGE;
  priceShouldBeGreaterZeroMessage = Constants.NEGATIVE_OR_ZERO_PRICE_MESSAGE;

  constructor(private route: ActivatedRoute,
              private specializationService: SpecializationService,
              private formBuilder: FormBuilder,
              private router: CustomRouterService) { }

  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    let specializationId = routeParams.get('specializationId');
    if (specializationId && specializationId !== 'addSpecialization') {
      this.specialization = await this.specializationService.getSpecializationById(specializationId);
    } else {
      this.specialization = new Specialization();
    }
    this.createSpecializationForm();
  }

  createSpecializationForm(): void {
    let name = this.specialization.name ? this.specialization.name : '';
    // let description = this.specialization.description ? this.specialization.description : '';
    this.specializationForm = this.formBuilder.group({
      name: [name, [Validators.required]],
      // description: [description, [Validators.required]],
      medicalServiceEntities: this.formBuilder.array(this.createMedicalServiceEntityFormArray())
    });
  }

  createMedicalServiceEntityFormArray(): AbstractControl[] {
    let medicalServiceEntityFormArray = [];
    if (this.specialization && this.specialization.medicalServiceEntities) {
      for (let medicalServiceEntity of this.specialization.medicalServiceEntities) {
        let medicalServiceEntityForm = this.createMedicalServiceEntityForm(medicalServiceEntity.name, medicalServiceEntity.price);
        medicalServiceEntityFormArray.push(medicalServiceEntityForm);
      }
    }
    return medicalServiceEntityFormArray;
  }

  createMedicalServiceEntityForm(name: string, price: number): FormGroup {
    return this.formBuilder.group({
      name: [name, [Validators.required]],
      price: [price, [Validators.required]]
    }, {validators: priceNotNegativeOrZero('price')});
  }

  deleteMedicalService(i: number): void {
    if (i !== -1) {
      let medicalServiceEntities = this.getMedicalServiceEntities();
      medicalServiceEntities.removeAt(i);
      this.specialization.medicalServiceEntities.splice(i, 1);
    }
  }

  getMedicalServiceEntities(): FormArray {
    return <FormArray>this.specializationForm.controls.medicalServiceEntities;
  }

  getMedicalServiceEntity(i: number): FormGroup {
    let medicalServiceEntities = this.specializationForm.get('medicalServiceEntities') as FormArray;
    return <FormGroup>medicalServiceEntities.at(i);
  }

  checkNegativePrice(i: number): boolean {
    return this.specializationForm.get('medicalServiceEntities')['controls'][i]?.get('name').errors?.negative;
  }

  updateMedicalService(i: number): void {
    let medicalServiceEntityFormGroup = this.getMedicalServiceEntity(i);
    let medicalServiceEntity = this.specialization.medicalServiceEntities[i];
    if (medicalServiceEntityFormGroup.valid) {
      medicalServiceEntity.name = medicalServiceEntityFormGroup.get('name').value;
      medicalServiceEntity.price = medicalServiceEntityFormGroup.get('price').value;
    } else {
      medicalServiceEntityFormGroup.get('name').patchValue(medicalServiceEntity.name);
      medicalServiceEntityFormGroup.get('price').patchValue(medicalServiceEntity.price);
    }
  }

  saveSpecialization(): void {
    this.specialization.name = this.specializationForm.get('name').value;
    // this.specialization.description = this.specializationForm.get('description').value;
    if (this.specialization.id) {
      console.log('Обновление специализации');
      this.specializationService.updateSpecialization(this.specialization).subscribe(response => {
        this.router.redirect('services');
      }, err => {
        console.log(err);
      });
    } else {
      console.log('Создание специализации');
      this.specializationService.createSpecialization(this.specialization).subscribe(response => {
        this.router.redirect('services');
      }, err => {
        console.log(err);
      });
    }
  }
}
