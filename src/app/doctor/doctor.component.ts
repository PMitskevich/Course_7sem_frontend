import {Component, OnInit} from '@angular/core';
import {Doctor} from "../model/Doctor";
import {DoctorService} from "../service/doctor.service";
import {User} from "../model/User";
import {StorageService} from "../service/storage.service";
import {UserService} from "../service/user.service";
import {CustomRouterService} from "../service/custom-router.service";
import {SpecializationService} from "../service/specialization.service";
import {Specialization} from "../model/Specialization";
import {FormBuilder, FormGroup} from "@angular/forms";

export class SelectedSpecialization {
  specializationName: string;
  selected: boolean = false;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors: Doctor[];
  filteredDoctors: Doctor[];
  user: User;
  specializations: Specialization[];
  selectedSpecializationsArray: SelectedSpecialization[];

  constructor(private doctorService: DoctorService,
              private storageService: StorageService,
              private userService: UserService,
              private router: CustomRouterService,
              private specializationService: SpecializationService,
              private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.specializations = await this.specializationService.getAllSpecializations();
    this.selectedSpecializationsArray = this.createSelectedSpecializationArray();
    this.doctors = await this.doctorService.getAllDoctors();
    this.filteredDoctors = this.doctors;
    let userId = this.storageService.currentUser;
    if (userId) {
      this.user = await this.userService.getUserById(userId);
      console.log(this.user);
      this.user.isAuthenticated = true;
    }
  }

  createDoctor(): void {
    this.router.redirect('doctor/addDoctor');
  }

  deleteDoctor(doctorId: string): void {
    this.doctorService.deleteDoctor(doctorId).subscribe(response => {
      console.log(response);
      this.doctors.forEach((element, index) => {
        if (element.id === doctorId) {
          this.doctors.splice(index, 1);
        }
      });
    });
  }

  createSelectedSpecializationFormGroup(specializationName: string): FormGroup {
    return this.formBuilder.group({
      specializationName: [specializationName],
      selected: [false]
    });
  }

  createSelectedSpecializationArray(): SelectedSpecialization[] {
    let selectedSpecializationFormArray = [];
    for (let specialization of this.specializations) {
      let selectedSpecialization = new SelectedSpecialization();
      selectedSpecialization.specializationName = specialization.name;
      selectedSpecializationFormArray.push(selectedSpecialization);
    }
    return selectedSpecializationFormArray;
  }

  checkSelectedSpecialization(value: SelectedSpecialization[]): void {
    if (value.length === 0) {
      this.filteredDoctors = this.doctors;
    }
    this.selectedSpecializationsArray.forEach((element, index) => {
      if (value.includes(element)) {
        element.selected = true;
        this.checkFilteredSpecializations();
      } else {
        element.selected = false;
      }
    });
  }

  checkFilteredSpecializations() {
    let isAnySpecializationSelected = false;
    for (let selectedSpecialization of this.selectedSpecializationsArray) {
      if (selectedSpecialization.selected) {
        isAnySpecializationSelected = true;
        break;
      }
    }
    if (isAnySpecializationSelected) {
      this.filteredDoctors = [];
      this.selectedSpecializationsArray.forEach((element, index) => {
        if (element.selected) {
          this.addSpecToSelectedSpecializations(element);
        }
        // this.checkForRemoveSelectedSpecialization();
      })
    } else {
      this.filteredDoctors = this.doctors;
    }
  }

  addSpecToSelectedSpecializations(element: SelectedSpecialization): void {
    this.doctors.forEach((doctor, doctorIndex) => {
      doctor.specializations.forEach((specializationElement, specializationIndex) => {
        if (specializationElement.name === element.specializationName) {
          if (this.filteredDoctors.filter(filteredDoctor => filteredDoctor.id === doctor.id).length === 0) {
            this.filteredDoctors.push(doctor);
          }
        }
      })
    })
  }

  checkForRemoveSelectedSpecialization(): void {
    this.selectedSpecializationsArray.forEach((selectedSpec, selectedIndex) => {
      if (!selectedSpec.selected) {
        console.log(selectedSpec);
        this.filteredDoctors.forEach((doctor, index) => {
          doctor.specializations.forEach((specializationElement, specializationIndex) => {
            if (specializationElement.name === selectedSpec.specializationName) {
              this.filteredDoctors.splice(index, 1);
            }
          })
        })
      }
    })
  }

  redirect(url: string) {
    this.router.redirect(url);
  }
}
