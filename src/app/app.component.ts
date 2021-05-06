import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AppState} from './store/app-store/app.state';
import {SetHeaderVisibility} from './store/app-store/app.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  showHeader: boolean;

  @Select(AppState.getHeaderState) headerState$: Observable<string>;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.alwaysGotoTop();
    this.getCurrentState();
    this.store.dispatch(new SetHeaderVisibility('visible'));
  }

  alwaysGotoTop(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTo(0, 0);
    });
  }

  getCurrentState(): void {
    this.headerState$.subscribe(headerVisibility => {
      this.showHeader = headerVisibility === 'visible';
    });
  }
}
