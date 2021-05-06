import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

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

  register(data: any): Observable<any> {
    const payload = new FormData();
    payload.append('name', data.name);
    payload.append('email', data.email);
    payload.append('password', data.password);

    return this.http.post<any>(`${this.baseURL}accounts/register`, payload)
      .pipe(
        map(res => {
          return res.payload;
        })
      );
  }
}
