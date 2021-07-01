import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetHeaderVisibility} from '../../store/app-store/app.action';
import {CourseService} from "../../core/services/course.service";


// @ts-ignore
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  coursesForHomePage: any;

  constructor(
    private store: Store,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new SetHeaderVisibility('visible'));
    this.getCoursesForHomepage();
  }

  getCoursesForHomepage(): void {
    this.courseService.getCoursesForHomepage().subscribe(res => {
      this.coursesForHomePage = res;
    });
  }

}
