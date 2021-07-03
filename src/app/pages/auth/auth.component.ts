import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {SetHeaderVisibility} from '../../store/app-store/app.action';
import {AppState} from '../../store/app-store/app.state';
import {Observable} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Location} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @Select(AppState.getToken) token$: Observable<string>;
  @Select(AppState.getReturningURL) returningURL$: Observable<string>;
  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token$.subscribe(token => {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (!isExpired) {
        this.returningURL$.subscribe(res => {
          if (res) {
            this.router.navigate([res]).then();
          } else {
            this.router.navigate(['/profile']).then();
          }
        });

      }
    });
    setTimeout(() => {
      this.store.dispatch(new SetHeaderVisibility('hidden'));
    }, 0);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.store.dispatch(new SetHeaderVisibility('visible'));
    }, 0);
  }

}
