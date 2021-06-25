import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';
import {SetToken} from '../../store/app-store/app.action';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  refresh: string;

  @Select(AppState.getRefreshToken) refresh$: Observable<string>;
  @Select(AppState.getToken) token$: Observable<string>;
  constructor(
    private router: Router,
    private store: Store,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    this.refresh$.subscribe(res => {
      this.refresh = res;
    });
  }

  canActivate(): boolean {
    this.token$.subscribe(token => {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        this.authService.refreshToken(this.refresh).subscribe(res => {
          if (res.access) {
            this.store.dispatch(new SetToken(res.access));
            return true;
          } else {
            this.router.navigate(['/auth']).then(() => {
              this.toastr.error('Session expired. You would need to login again.', 'Access Denied');
            });
            return false;
          }
        });
      }
    });
    return true;
  }
}
