import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainContainerComponent } from './main-container/main-container.component';
import { HeaderComponent } from './header/header.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "./service/interceptor.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { MedicalServiceComponent } from './medical-service/medical-service.component';
import { SpecializationConstructorComponent } from './specialization-constructor/specialization-constructor.component';
import { MedicalServiceConstructorComponent } from './medical-service-constructor/medical-service-constructor.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorConstructorComponent } from './doctor-constructor/doctor-constructor.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import { AppointmentConstructorComponent } from './appointment-constructor/appointment-constructor.component';
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from "@angular/material/stepper";
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { AppointmentComponent } from './appointment/appointment.component';
import { OfficeComponent } from './office/office.component';
import { ReviewComponent } from './review/review.component';
import { MapComponent } from './map/map.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {IgxCategoryChartModule, IgxItemLegendModule, IgxLegendModule, IgxPieChartModule} from "igniteui-angular-charts";
import { LineGraphComponent } from './line-graph/line-graph.component';
import { CircleGraphComponent } from './circle-graph/circle-graph.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    HeaderComponent,
    LeftBarComponent,
    FooterComponent,
    HomepageComponent,
    SignInComponent,
    SignUpComponent,
    MedicalServiceComponent,
    SpecializationConstructorComponent,
    MedicalServiceConstructorComponent,
    DoctorComponent,
    DoctorConstructorComponent,
    AppointmentConstructorComponent,
    AppointmentComponent,
    OfficeComponent,
    ReviewComponent,
    MapComponent,
    StatisticsComponent,
    LineGraphComponent,
    CircleGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    IgxCategoryChartModule,
    IgxLegendModule,
    IgxPieChartModule,
    IgxItemLegendModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
