import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetHeaderVisibility} from '../../store/app-store/app.action';
import {CourseService} from '../../core/services/course.service';
import {HomePageService} from '../../core/services/home-page.service';



// @ts-ignore
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  coursesForHomePage: any;
  services: any;

  constructor(
    private store: Store,
    private courseService: CourseService,
    private homePageService: HomePageService,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new SetHeaderVisibility('visible'));
    this.getCoursesForHomepage();
    this.getAllServices();
  }

  getCoursesForHomepage(): void {
    this.courseService.getCoursesForHomepage().subscribe(res => {
      this.coursesForHomePage = res;
    });
  }

  getAllServices(): void {
    this.homePageService.getAllServices().subscribe(res => {
      this.services = res;
      console.log('Adeola is here: ', this.services);
    });
  }

}
