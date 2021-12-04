import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DoctorService} from "../service/doctor.service";
import {Doctor} from "../model/Doctor";
import {ScheduleDay} from "../model/ScheduleDay";
import {ScheduleTime} from "../model/ScheduleTime";
import {Constants} from "../constant/Constants";
import {Animal} from "../model/Animal";
import {Gender} from "../model/Gender";
import {UserService} from "../service/user.service";
import {StorageService} from "../service/storage.service";
import {User} from "../model/User";
import {Appointment} from "../model/Appointment";
import {AppointmentService} from "../service/appointment.service";
import {CustomRouterService} from "../service/custom-router.service";

@Component({
  selector: 'app-appointment-constructor',
  templateUrl: './appointment-constructor.component.html',
  styleUrls: ['./appointment-constructor.component.css']
})
export class AppointmentConstructorComponent implements OnInit {

  doctor: Doctor;
  selectedDay: ScheduleDay;
  selectedTime: ScheduleTime;
  firstStepForm: FormGroup;
  secondStepForm: FormGroup;
  thirdStepForm: FormGroup;
  currentDate: Date;
  animal: Animal;
  genders: Gender[] = [Gender.MALE, Gender.FEMALE];
  selectedGender: string;
  selectedAnimal: string;
  user: User;
  requiredFieldMessage = Constants.REQUIRED_FIELD_MESSAGE;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private doctorService: DoctorService,
              private userService: UserService,
              private storageService: StorageService,
              private appointmentService: AppointmentService,
              private router: CustomRouterService) { }

  async ngOnInit(): Promise<void> {
    const routeParams = this.route.snapshot.paramMap;
    let doctorId = routeParams.get('doctorId');
    this.doctor = await this.doctorService.getDoctorById(doctorId);
    this.initializeFormGroups();
    this.currentDate = new Date();
    this.animal = new Animal();
    if (this.storageService.currentUser) {
      let userId = this.storageService.currentUser;
      this.user = await this.userService.getUserById(userId);
    }
    this.selectedGender = Gender.MALE;
    this.selectedAnimal = this.user.owner.animals[0].name;
  }

  setSelectedDay(selectedDay: ScheduleDay): void {
    if(this.secondStepForm.get('secondStepCompleted').value) {
      this.secondStepForm.get('secondStepCompleted').setValue(false);
      this.selectedTime = null;
    }
    this.selectedDay = selectedDay;
    this.firstStepForm.get('firstStepCompleted').patchValue(true);
  }

  setSelectedTime(selectedTime: ScheduleTime): void {
    this.selectedTime = selectedTime;
    this.secondStepForm.get('secondStepCompleted').patchValue(true);
    this.thirdStepForm = this.fillThirdStepFormGroup();
  }

  getTime(time: ScheduleTime): string {
    return time.time.toString().substr(0, 5);
  }

  changeGender(gender: string): void {
    console.log(gender);
    this.selectedGender = gender;
    this.genders.forEach((genderElement, index) => {
      if (gender === genderElement) {
        // let genderVariableName = AppointmentConstructorComponent.getGenderVariableName(gender);
        this.thirdStepForm.get('gender').patchValue(gender);
      }
    })
  }

  initializeFormGroups(): void {
    this.firstStepForm = this.formBuilder.group({
      firstStepCompleted: [false, [Validators.requiredTrue]]
    });
    this.secondStepForm = this.formBuilder.group({
      secondStepCompleted: [false, [Validators.requiredTrue]]
    });
    this.thirdStepForm = this.fillThirdStepFormGroup();
  }

  fillThirdStepFormGroup(animal?: Animal): FormGroup {
    console.log(animal);
    if (animal) {
      this.selectedGender = animal.gender;
    }
    return <FormGroup> this.formBuilder.group({
      name: [animal ? animal.name : '', [Validators.required]],
      birthday: [animal ? animal.birthday : '', [Validators.required]],
      breed: [animal ? animal.breed : '', [Validators.required]],
      gender: [animal ? animal.gender : 'Мужской', [Validators.required]]
    });
  }

  changeSelectedAnimal(animalName: string): void {
    for (let i = 0; i < this.user.owner.animals.length; i++) {
      if (this.user.owner.animals[i].name === animalName) {
        this.animal = this.user.owner.animals[i];
        this.selectedAnimal = this.animal.name;
        break;
      }
    }
  }

  selectExistingAnimal() {
    if (!this.animal.id) {
      this.changeSelectedAnimal(this.selectedAnimal);
    }
    this.thirdStepForm = this.fillThirdStepFormGroup(this.animal);
  }

  cancelSelectedAnimal(): void {
    this.animal = new Animal();
    this.thirdStepForm = this.fillThirdStepFormGroup();
  }

  addAppointment(): void {
    if (this.firstStepForm.valid && this.secondStepForm.valid && this.thirdStepForm.valid) {
      this.fillAnimal();
      this.blockScheduleDayAndTime();
      let appointment = new Appointment();
      appointment.owner = this.user.owner;
      appointment.animal = this.animal;
      appointment.doctor = this.doctor;
      appointment.dateTime = this.getAppointmentDateTime();
      console.log(appointment);
      this.appointmentService.createAppointment(appointment).subscribe(response => {
        console.log(response);
        this.router.redirect('');
      });
    }
  }

  fillAnimal(): void {
    this.animal.name = this.thirdStepForm.get('name').value;
    this.animal.birthday = this.thirdStepForm.get('birthday').value;
    this.animal.gender = this.thirdStepForm.get('gender').value;
    this.animal.breed = this.thirdStepForm.get('breed').value;
  }

  blockScheduleDayAndTime(): void {
    for(let i = 0; i < this.doctor.scheduleDays.length; i++) {
      if (this.doctor.scheduleDays[i].id === this.selectedDay.id) {
        for (let j = 0; j < this.doctor.scheduleDays[i].scheduleTimes.length; j++) {
          if (this.doctor.scheduleDays[i].scheduleTimes[j].id === this.selectedTime.id) {
            this.doctor.scheduleDays[i].isBlocked = true;
            this.doctor.scheduleDays[i].scheduleTimes[j].isBlocked = true;
            return;
          }
        }
      }
    }
  }

  getAppointmentDateTime(): string {
    let date = this.selectedDay.date.toString();
    let hoursMinutes = this.selectedTime.time.toString().split(/[.:]/);
    return date + ' ' + hoursMinutes[0] + ':' + hoursMinutes[1];
  }
}
