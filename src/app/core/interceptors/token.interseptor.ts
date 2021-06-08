import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../../store/app-store/app.state';
import {SetDecodedToken, SetToken} from '../../store/app-store/app.action';
import {AuthService} from '../../shared/services/auth.service';
import {catchError, delay, map, retry} from "rxjs/operators";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token: string;
  refreshToken: string;

  @Select(AppState.getToken) token$: Observable<string>;
  @Select(AppState.getRefreshToken) refreshToken$: Observable<string>;
  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService
  ) {
    this.refreshToken$.subscribe(res => {
      this.refreshToken = res;
    });

    this.getToken();
  }

  getToken(): void {
    const helper = new JwtHelperService();
    this.token$.subscribe(res => {
      console.log(res);
      this.token = res;
      const decodedToken = helper.decodeToken(res);
      this.store.dispatch(new SetDecodedToken(decodedToken));
      const expirationDate = helper.getTokenExpirationDate(res);
      const isExpired = helper.isTokenExpired(res);

      if (isExpired === true) {
        this.authService.refreshToken(this.refreshToken);
        this.getNewToken(this.refreshToken);
      }

      if (this.router.url === '/auth/login' && isExpired === false) {
        this.router.navigate(['/courses']).then();
      }
    });
  }

  sleep(milliseconds): void {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.sleep(5000);
        }
        return throwError('');
      }),
      retry(4)
    );
  }

  getNewToken(refresh: string): void {
    const sample = this.authService.refreshToken(refresh);
    console.log('WWWWWWWWWWWWWW', sample);

    // if (res.code === 'token_not_valid') {
    //   this.router.navigate(['/auth/login']).then();
    // } else {
    //   console.log('CCCCCCCCCCC', res);
    //   this.store.dispatch(new SetToken(res));
    //   // this.router.navigate(['/auth/login']).then();
    // }
  }
}


