import { NgModule } from '@angular/core';
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
import {ReactiveFormsModule} from '@angular/forms';
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
    MedicalServiceConstructorComponent
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
    MatExpansionModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
