import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {User} from "../model/User";
import {catchError} from "rxjs/operators";
import {AuthenticationUser} from "../model/AuthenticationUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/course/auth';

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "user/all")
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.url + "user/" + userId);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "user/addUser", user)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + "user/" + user.id, user)
      .pipe(
        catchError(error => {
          this.router.navigate(['403']);
          return throwError(error)
        })
      );
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(this.url + "user/" + userId)
      .pipe(
        catchError(error => {
          this.router.navigate(['403']);
          return throwError(error);
        })
      );
  }

  signIn(account: AuthenticationUser): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.url + "/login", account, {observe: 'response', responseType: 'json'})
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.get <HttpResponse<any>>(this.url + "/logout")
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
