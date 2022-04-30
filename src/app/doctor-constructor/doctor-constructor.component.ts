import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../constant/Constants";
import {Specialization} from "../model/Specialization";
import {SpecializationService} from "../service/specialization.service";
import {loginValidator, phoneValidator} from "../service/validators";
import {Doctor} from "../model/Doctor";
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../service/doctor.service";
import {CustomRouterService} from "../service/custom-router.service";

export class SpecializationCheckbox {
  name: string;
  checked: boolean = false;
}

@Component({
  selector: 'app-doctor-constructor',
  templateUrl: './doctor-constructor.component.html',
  styleUrls: ['./doctor-constructor.component.css']
})
export class DoctorConstructorComponent implements OnInit {

  doctorForm: FormGroup;
  doctor: Doctor;
  specializations: Specialization[];
  specializationCheckboxList: SpecializationCheckbox[] = [];
  requiredFieldMessage = Constants.REQUIRED_FIELD_MESSAGE;
  phoneDoesntMatchPattern = Constants.PHONE_DOESNT_MATCH_PATTERN;

  constructor(private formBuilder: FormBuilder,
              private specializationService: SpecializationService,
              private route: ActivatedRoute,
              private doctorService: DoctorService,
              private router: CustomRouterService) { }

  // При загрузке компоненты у доктора 1 специализация, а при последующем нажатии кнопки сохранить
  // в логах видно, что создаётся копия специализации, отличие только в поле doctors (В копии она заполнена единственным значением
  // с объектом данного доктора (У оригинала null). В кач-ве врем. решения в методе fillDoctorSpecializations
  // добавлен двойной цикл, который исключает повторяющиеся специализации.
  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    let doctorId = routeParams.get('doctorId');
    if (doctorId && doctorId !== 'addDoctor') {
      this.doctor = await this.doctorService.getDoctorById(doctorId);
    } else {
      this.doctor = new Doctor();
      this.doctor.specializations = [];
    }
    this.doctorForm = this.createDoctorForm(this.doctor);
    this.specializations = await this.specializationService.getAllSpecializations();
    this.fillSpecializationCheckboxList();
    console.log(this.doctor);
  }

  createDoctorForm(doctor: Doctor): FormGroup {
    return this.formBuilder.group({
      lastName: [doctor.id ? doctor.lastName : '', [Validators.required]],
      firstName: [doctor.id ? doctor.firstName : '', [Validators.required]],
      patronymic: [doctor.id ? doctor.patronymic : '', [Validators.required]],
      address: [doctor.id ? doctor.address : '', [Validators.required]],
      phone: [doctor.id ? doctor.phone : '', [Validators.required, phoneValidator(/^(\+375|80) (29|25|44|33|17) (\d{3}) (\d{2}) (\d{2})$/)]],
      experience: [doctor.id ? doctor.experience : '', [Validators.required]],
      specializationsFilled: [this.doctor.specializations.length !== 0, [Validators.requiredTrue]]
    })
  }

  fillSpecializationCheckboxList(): void {
    if (this.doctor.id) {
      this.specializations.forEach((specialization, index) => {
        let specializationCheckbox = new SpecializationCheckbox();
        specializationCheckbox.name = specialization.name;
        this.doctor.specializations.forEach((doctorSpecialization, specIndex) => {
          if (doctorSpecialization.name === specialization.name) {
            specializationCheckbox.checked = true;
          }
        });
        this.specializationCheckboxList.push(specializationCheckbox);
      });
    } else {
      this.specializations.forEach((specialization, index) => {
        let specializationCheckbox = new SpecializationCheckbox();
        specializationCheckbox.name = specialization.name;
        this.specializationCheckboxList.push(specializationCheckbox);
      })
    }
  }

  changeState(checked: boolean, i: number): void {
    this.specializationCheckboxList[i].checked = !this.specializationCheckboxList[i].checked;
    let isSpecializationCheckboxListEmpty = true;
    this.specializationCheckboxList.forEach((element, index) => {
      if (element.checked) {
        isSpecializationCheckboxListEmpty = false;
      }
    });
    if (isSpecializationCheckboxListEmpty) {
      this.doctorForm.get('specializationsFilled').patchValue(false);
    } else {
      this.doctorForm.get('specializationsFilled').patchValue(true);
    }
    console.log(this.doctor);
  }

  updateField(formControlName: string): void {
    if (!this.doctorForm.get(formControlName).valid && this.doctor.id) {
      this.doctorForm.get(formControlName).patchValue(this.getAbstractValue(formControlName))
    }
  }

  saveDoctor(): void {
    if (this.doctorForm.valid) {
      console.log(this.doctor);
      this.doctor.firstName = this.doctorForm.get('firstName').value;
      this.doctor.lastName = this.doctorForm.get('lastName').value;
      this.doctor.patronymic = this.doctorForm.get('patronymic').value;
      this.doctor.address = this.doctorForm.get('address').value;
      this.doctor.experience = this.doctorForm.get('experience').value;
      this.doctor.phone = this.doctorForm.get('phone').value;
      this.fillDoctorSpecializations();
      this.sendRequest();
    }
  }

  private fillDoctorSpecializations() {
    this.specializationCheckboxList.forEach((element, index) => {
      if (element.checked) {
        for (let i = 0; i < this.specializations.length; i++) {
          if (element.name === this.specializations[i].name && !this.doctor.specializations.includes(this.specializations[i])) {
            this.doctor.specializations.push(this.specializations[i]);
            break;
          }
        }
      } else {
        for (let i = 0; i < this.doctor.specializations.length; i++) {
          if (this.doctor.specializations[i].name === element.name) {
            this.doctor.specializations.splice(i, 1);
          }
        }
      }
    });
    for (let i = 0; i < this.doctor.specializations.length; i++) {
      for (let j = 0; j < this.doctor.specializations.length; j++) {
        if (i !== j && this.doctor.specializations[i].name === this.doctor.specializations[j].name) {
          this.doctor.specializations.splice(i, 1);
          break;
        }
      }
    }
  }

  private sendRequest(): void {
    if (this.doctor.id) {
      this.doctorService.updateDoctor(this.doctor).subscribe(response => {
        console.log(response);
        this.router.redirect('doctors');
      });
    } else {
      this.doctorService.createDoctor(this.doctor).subscribe(response => {
        console.log(response);
        this.router.redirect('doctors');
      })
    }
  }

  public getAbstractValue(propertyName: string): string {
    switch (propertyName) {
      case 'firstName': return this.doctor.firstName;
      case 'lastName': return this.doctor.lastName;
      case 'patronymic': return this.doctor.patronymic;
      case 'address': return this.doctor.address;
      case 'phone': return this.doctor.phone;
      case 'experience': return this.doctor.experience;
    }
  }
}
