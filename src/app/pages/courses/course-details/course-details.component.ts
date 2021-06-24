import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Select} from "@ngxs/store";
import {AppState} from "../../../store/app-store/app.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-about-course',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseDetails: any;
  userProfile: any;
  lessonList: any;
  descriptionLength = 500;
  reference = 'uacl-ref-' + Date.now();

  @Select(AppState.getUserProfile) userProfile$: Observable<any>;
  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.userProfile$.subscribe(res => {
      this.userProfile = res;
    });
    this.getCourseDetails(this.activatedRoute.snapshot.params.slug);
  }

  getCourseDetails(slug: string): void {
    this.coursesService.getCourseDetails(slug).subscribe(res => {
      this.courseDetails = res;
      this.getCourseLessons(this.courseDetails.slug);
    });
  }

  paymentInit(): void {

  }

  paymentCancel(): void {

  }

  paymentDone($event: any): void {
    console.log('payment successful', $event);
    this.router.navigate([`/courses/classroom/${this.activatedRoute.snapshot.params.slug}`]).then();
  }

  continueLearning(): void {
    this.router.navigate([`/courses/classroom/${this.activatedRoute.snapshot.params.slug}`]).then();
  }

  getCourseLessons(slug: string): void {
    this.coursesService.getCourseLessons(slug).subscribe(res => {
      this.lessonList = res;
    });
  }
}
