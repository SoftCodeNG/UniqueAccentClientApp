import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {retry, catchError, tap, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  errorMessage: string;

  constructor(
    private router: Router,
    private injector: Injector,
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),

        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toastr.info(error.error.message ? error.error.message : 'Your session has expired', `Unauthorised`);
            localStorage.clear();
            this.router.navigateByUrl('/login').then();
          }


          if (!(error.error instanceof ErrorEvent)) {
            // server-side error
            switch (error.status) {
              // tslint:disable-next-line:max-line-length
              case 500: {this.toastr.error(error.error.message ? error.error.message : 'Something went wrong internally, Our Engineers has been notified of this error. Please try again.', `Error: ${error.status}`); break; }
              // tslint:disable-next-line:max-line-length
              case 503: {this.toastr.error(error.error.message ? error.error.message : 'Something went wrong internally, Our Engineers has been notified of this error. Please try again.', `Error: ${error.status}`); break; }
              // tslint:disable-next-line:max-line-length
              case 400: {this.toastr.error(error.error.message ? error.error.message : 'Something went wrong, we were unable to process your request', `Error: ${error.status}`); break; }
              case 403: {this.toastr.error(error.error.message ? error.error.message : 'Not found', `Error: ${error.status}`); break; }
              case 404: {this.toastr.info(error.error.message ? error.error.message : 'Something went wrong, couldn\'t get to the request', `Information`); break; }
              case 0: {this.toastr.error(error.error.message ? error.error.message : 'Couldn\'t connect', `Error: ${error.status}`); break; }
            }
          }

          return throwError(this.errorMessage);

        })
      );
  }
}
