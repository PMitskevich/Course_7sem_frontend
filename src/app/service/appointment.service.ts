import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Doctor} from "../model/Doctor";
import {Constants} from "../constant/Constants";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Appointment} from "../model/Appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  async getAppointmentById(appointmentId: string): Promise<Appointment> {
    return this.http.get<Appointment>(Constants.ROOT_URL + "appointment/" + appointmentId).toPromise();
  }

  async getAppointmentsByOwnerId(ownerId: string): Promise<Appointment[]> {
    return this.http.get<Appointment[]>(Constants.ROOT_URL + "appointment/myAppointments/" + ownerId).toPromise();
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.http.get<Appointment[]>(Constants.ROOT_URL + "appointment/all")
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      ).toPromise();
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(Constants.ROOT_URL + "appointment/addAppointment", appointment)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(Constants.ROOT_URL + "appointment/" + appointment.id, appointment)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error)
        })
      );
  }

  deleteAppointment(appointmentId: string): Observable<Appointment> {
    return this.http.delete<Appointment>(Constants.ROOT_URL + "appointment/" + appointmentId)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
