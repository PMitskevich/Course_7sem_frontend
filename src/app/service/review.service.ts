import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Review} from "../model/Review";
import {Constants} from "../constant/Constants";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  async getAllReviews(): Promise<Review[]> {
    return this.http.get<Review[]>(Constants.ROOT_URL + 'review/all').toPromise();
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(Constants.ROOT_URL + 'review/addReview', review)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  deleteReview(reviewId: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(Constants.ROOT_URL + 'review/' + reviewId)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );;
  }
}
