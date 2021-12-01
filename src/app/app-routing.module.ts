import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MedicalServiceComponent} from "./medical-service/medical-service.component";
import {SpecializationConstructorComponent} from "./specialization-constructor/specialization-constructor.component";
import {DoctorComponent} from "./doctor/doctor.component";
import {DoctorConstructorComponent} from "./doctor-constructor/doctor-constructor.component";
import {AppointmentConstructorComponent} from "./appointment-constructor/appointment-constructor.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'services', component: MedicalServiceComponent},
  {path: 'services/:specializationId', component: MedicalServiceComponent},
  {path: 'specialization/:specializationId', component: SpecializationConstructorComponent},
  {path: 'specialization/addSpecialization', component: SpecializationConstructorComponent},
  {path: 'doctors', component: DoctorComponent},
  {path: 'doctor/addDoctor', component: DoctorConstructorComponent},
  {path: 'doctor/:doctorId', component: DoctorConstructorComponent},
  {path: 'bookAppointment/:doctorId', component: AppointmentConstructorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
