import { Injectable } from '@angular/core';
import {Specialization} from "../model/Specialization";
import {Constants} from "../constant/Constants";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Doctor} from "../model/Doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  async getDoctorById(doctorId: string): Promise<Doctor> {
    return this.http.get<Doctor>(Constants.ROOT_URL + "doctor/" + doctorId).toPromise();
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return this.http.get<Doctor[]>(Constants.ROOT_URL + "doctor/all")
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      ).toPromise();
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(Constants.ROOT_URL + "doctor/addDoctor", doctor)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(Constants.ROOT_URL + "doctor/" + doctor.id, doctor)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error)
        })
      );
  }

  deleteDoctor(doctorId: string): Observable<Doctor> {
    return this.http.delete<Doctor>(Constants.ROOT_URL + "doctor/" + doctorId)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
