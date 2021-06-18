import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Select} from '@ngxs/store';
import {AppState} from '../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Select(AppState.getToken) token$: Observable<string>;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    this.token$.subscribe(token => {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        this.router.navigate(['/auth/login']).then(() => {
          this.toastr.error('Login first to access the classroom', 'Access Denied');
        });
        return false;
      }
    });
    return true;
  }
}
