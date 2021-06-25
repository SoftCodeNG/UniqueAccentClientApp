import {Component, OnInit, ViewChild} from '@angular/core';
import {Select} from '@ngxs/store';
import {AppState} from '../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {SwiperComponent} from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  userCourses: any;
  deviceWidth = screen.width;
  greetingMessage: string;
  greetings = [
    'Stay safe, remember to wash your hands 👋🏾👋🏼👋👋🏻👋🏽👋🏿',
    'Always speak rite, someone could be listening 🙊',
    'Thanks for visiting Unique Accent today. 😊'
  ];

  @Select(AppState.getUserProfile) userProfile$: Observable<string>;
  @ViewChild('swiperRef', { static: false }) sliderRef?: SwiperComponent;
  @Select(AppState.getUserCourses) userCourses$: Observable<string>;
  constructor() { }

  ngOnInit(): void {
    this.getGreetings();
    this.userProfile$.subscribe(res => {
      this.userProfile = res;
    });
    this.userCourses$.subscribe(res => {
      this.userCourses = res;
    });
  }

  getGreetings(): void {
    const greetings = this.greetings;
    const arrayLength = Math.floor(Math.random() * greetings.length);
    this.greetingMessage = this.greetings[arrayLength];
  }

}
