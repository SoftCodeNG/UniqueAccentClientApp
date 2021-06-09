import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../../store/app-store/app.state';
import {SetToken} from '../../store/app-store/app.action';
import {AuthService} from '../../shared/services/auth.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  token: string;
  refreshToken: string;

  @Select(AppState.getToken) token$: Observable<string>;
  @Select(AppState.getRefreshToken) refreshToken$: Observable<string>;
  constructor(
    private router: Router,
    private store: Store,
    public authService: AuthService
  ) {
    this.refreshToken$.subscribe(res => {
      this.refreshToken = res;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token$.subscribe(res => {
      this.token = res;
      if (res) {
        request = this.addToken(request, res);
      }
    });

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken(this.refreshToken).pipe(
      switchMap((token: any) => {
        console.log('QQQQQQQQQQQQQQQQ: ', token);
        this.isRefreshing = false;
        this.refreshTokenSubject.next(token.access);
        if (token.access) {
          console.log('CCCCCCCCCCC', token.access);
          this.store.dispatch(new SetToken(token.access));
        }
        return next.handle(this.addToken(request, token.access));
      }));
  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => {
        this.router.navigate(['/auth/login']).then();
        return token != null;
      }),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addToken(request, jwt));
      }));
    }
  }
}
