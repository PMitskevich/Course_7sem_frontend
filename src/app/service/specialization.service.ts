import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Specialization} from "../model/Specialization";
import {Constants} from "../constant/Constants";

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http: HttpClient) { }

  async getSpecializationById(specializationId: string): Promise<Specialization> {
    return this.http.get<Specialization>(Constants.ROOT_URL + "specialization/" + specializationId).toPromise();
  }

  async getAllSpecializations(): Promise<Specialization[]> {
    return this.http.get<Specialization[]>(Constants.ROOT_URL + "specialization/all")
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      ).toPromise();
  }

  createSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(Constants.ROOT_URL + "specialization/addSpecialization", specialization)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  updateSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.put<Specialization>(Constants.ROOT_URL + "specialization/" + specialization.id, specialization)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error)
        })
      );
  }

  deleteSpecialization(specializationId: string): Observable<Specialization> {
    return this.http.delete<Specialization>(Constants.ROOT_URL + "specialization/" + specializationId)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
