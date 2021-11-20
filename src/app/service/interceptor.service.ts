import {Injectable, Injector} from '@angular/core';
import {StorageService} from "./storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private storageService: StorageService,
              public snackBar: MatSnackBar,
              private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor started');
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentUser && this.storageService.currentToken && localStorage.lang) {
        // const lang = localStorage.lang.toLowerCase().replace(/['"]+/g, '');
        req = req.clone({
          setHeaders: {
            Authorization: `${this.storageService.currentToken}`
          },
          url: req.url
          // url: req.url + `?lang=${lang}`
        });
      }
    }

    return next.handle(req).pipe(
      catchError((res) => this.handleError(res))
    );
  }

  handleError(errorResponse: HttpErrorResponse) {
    let message = '';
    let snackbarAction = 'Закрыть';
    let errorTitle = 'Заголовок';
    let errorCode = 'Код ошибки';
    let errorMessage = 'Сообщение';
    // const translateService = this.injector.get(TranslateService);
    // translateService.stream('INTERCEPTOR.SNACKBAR').subscribe(value => {
    //   snackbarAction = value.ACTION;
    //   errorTitle = value.ERROR.TITLE;
    //   errorCode = value.ERROR.CODE;
    //   errorMessage = value.ERROR.MESSAGE;
    //   unauthorized = value.ERROR.AUTHORIZATION;
    // });
    if (errorResponse.error) {
      console.log(errorResponse);
      if (errorResponse.error.errorTitle && errorResponse.error.errorCode && errorResponse.error.message) {
        message = `${errorTitle}: ${errorResponse.error.errorTitle}\n` +
          `${errorCode}: ${errorResponse.error.errorCode}\n` +
          `${errorMessage}: ${errorResponse.error.message}`;
      } else {
        if (errorResponse.status == 403) {
          message = 'Доступ запрещён, пожалуйста авторизуйтесь';
        }
        if (errorResponse.status == 500 && errorResponse.statusText === 'OK' && errorResponse.url.includes('/course/user')) {
          StorageService.clear();
          message = 'Аутентификационный токет истёк или является невалидным';
        } else {
          message = errorResponse.message;
        }
      }
    }
    if (snackbarAction) {
      this.snackBar.open(message, snackbarAction, {
        panelClass: ['snackbar']
      });
    }
    return throwError(errorResponse.error);
  }
}

