import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {SetRefreshToken, SetToken} from "../../../store/app-store/app.action";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  isLoggedIn = false;

  @Select(AppState.getToken) token$: Observable<string>;
  constructor(
    private router: Router,
    private store: Store,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.token$.subscribe(token => {
      if (token) {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(token);
        if (!isExpired) {
          this.isLoggedIn = true;
        }
      }
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      const overlay = document.getElementById('overlay') as HTMLDivElement;
      const navBar = document.getElementById('navBar') as HTMLDivElement;
      overlay.classList.remove('show');
      navBar.classList.remove('show');
      this.showMenu = false;
    });
  }

  toggleMenu(): void {
    const overlay = document.getElementById('overlay') as HTMLDivElement;
    const navBar = document.getElementById('navBar') as HTMLDivElement;
    if (this.showMenu === true) {
      overlay.classList.remove('show');
      navBar.classList.remove('show');
      this.showMenu = false;
    } else {
      overlay.classList.add('show');
      navBar.classList.add('show');
      this.showMenu = true;
    }
  }

  logout(): void {
    this.router.navigate(['/auth/login']).then(() => {
      this.store.dispatch(new SetToken(null));
      this.store.dispatch(new SetRefreshToken(null));
      this.toastr.success('Login successful');
    });
  }
}
