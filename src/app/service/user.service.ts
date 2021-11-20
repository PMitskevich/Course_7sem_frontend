import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {User} from "../model/User";
import {catchError} from "rxjs/operators";
import {AuthenticationUser} from "../model/AuthenticationUser";
import {Constants} from "../constant/Constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      })
  };

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(Constants.ROOT_URL + "user/all")
  }

  async getUserById(userId: string): Promise<User> {
    return this.http.get<User>(Constants.ROOT_URL + "user/" + userId).toPromise();
      // .pipe(
      //   catchError(err => {
      //     console.log(err);
      //     return throwError(err);
      //   })
      // )
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(Constants.ROOT_URL + "user/addUser", user)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(Constants.ROOT_URL + "user/" + user.id, user)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error)
        })
      );
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(Constants.ROOT_URL + "user/" + userId)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  signIn(account: AuthenticationUser): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(Constants.ROOT_URL + "auth/login", account, {observe: 'response', responseType: 'json'})
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.get <HttpResponse<any>>(Constants.ROOT_URL + "auth/logout")
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
