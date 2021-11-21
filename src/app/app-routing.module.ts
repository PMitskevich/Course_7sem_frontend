import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MedicalServiceComponent} from "./medical-service/medical-service.component";
import {SpecializationConstructorComponent} from "./specialization-constructor/specialization-constructor.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'services', component: MedicalServiceComponent},
  {path: 'services/:specializationId', component: MedicalServiceComponent},
  {path: 'specialization/:specializationId', component: SpecializationConstructorComponent},
  {path: 'specialization/addSpecialization', component: SpecializationConstructorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
