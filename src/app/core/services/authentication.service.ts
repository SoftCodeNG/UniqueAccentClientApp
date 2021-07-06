import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseURL = environment.baseURL;

  constructor(
    private http: HttpClient,
  ) { }

  login(data: any): Observable<any> {
    const payload = new FormData();
    payload.append('email', data.email);
    payload.append('password', data.password);

    return this.http.post<any>(`${this.baseURL}auth/token`, payload)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  refreshToken(refresh: string): Observable<any> {
    const payload = new FormData();
    payload.append('refresh', refresh);

    return this.http.post<any>(`${this.baseURL}auth/token/refresh`, payload)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  register(data: any): Observable<any> {
    const payload = new FormData();
    payload.append('name', data.name);
    payload.append('email', data.email);
    payload.append('password', data.password);

    return this.http.post<any>(`${this.baseURL}accounts/register`, payload)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  loginWithGoogle(data: any): Observable<any> {
    const payload = new FormData();
    payload.append('token', data.token);
    payload.append('name', data.name);

    return this.http.post<any>(`${this.baseURL}accounts/loginWithGoogle`, payload)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  requestPasswordChange(data: any): Observable<any> {
    const payload = new FormData();
    payload.append('email', data.email);

    return this.http.post<any>(`${this.baseURL}accounts/forgetPassword`, payload)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  resetPassword(data: any): Observable<any> {
    const payload = new FormData();
    payload.append('token', data.token);
    payload.append('password', data.password);

    return this.http.post<any>(`${this.baseURL}accounts/resetPassword`, payload)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
