import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {SetHeaderVisibility} from '../../store/app-store/app.action';
import {AppState} from '../../store/app-store/app.state';
import {Observable} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Location} from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @Select(AppState.getToken) token$: Observable<string>;
  constructor(
    private store: Store,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.token$.subscribe(token => {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (!isExpired) {
        this.location.back();
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
