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
  public courseDetails: any;

  constructor(
    private store: Store,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new SetHeaderVisibility('visible'));
  }

  getCoursesForHomepage(slug: string): void {
    this.courseService.getCoursesForHomepage(slug).subscribe(res => {
      this.courseDetails = res;
    });
  }

}
