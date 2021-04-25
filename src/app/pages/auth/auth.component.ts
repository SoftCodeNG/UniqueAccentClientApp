import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetHeaderVisibility} from '../../../store/app-store/app.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
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
