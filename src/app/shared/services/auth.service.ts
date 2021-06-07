import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Store} from "@ngxs/store";
import {SetToken} from "../../store/app-store/app.action";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = environment.baseURL;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
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

  refreshToken(refresh: string): void {
    const payload = new FormData();
    payload.append('refresh', refresh);

    fetch(`${this.baseURL}auth/token/refresh`, {
      method: 'POST',
      body: payload
    }).then(response => response.json())
      .then(data => {
        console.log('AAAAAAAAAA:', data);
        if (data.code === 'token_not_valid') {
          this.router.navigate(['/auth/login']).then();
        } else {
          console.log('Success:', data);
          this.store.dispatch(new SetToken(data.access));
        }
      });
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
