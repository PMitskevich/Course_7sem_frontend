import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Owner} from "../model/Owner";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthenticationUser} from "../model/AuthenticationUser";
import {Constants} from "../constant/Constants";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getOwnerById(ownerId: string): Observable<Owner> {
    return this.http.get<Owner>(Constants.ROOT_URL + "owner/" + ownerId);
  }

  createOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(Constants.ROOT_URL + "owner/addOwner", owner)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  updateOwner(owner: Owner): Observable<Owner> {
    return this.http.put<Owner>(Constants.ROOT_URL + "owner/" + owner.id, owner)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error)
        })
      );
  }

  deleteOwner(ownerId: string): Observable<Owner> {
    return this.http.delete<Owner>(Constants.ROOT_URL + "owner/" + ownerId)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
