import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetHeaderVisibility} from '../../store/app-store/app.action'; // lib


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new SetHeaderVisibility('visible'));
  }

}
