import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-about-course',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
   public courseDetails: any;
   reference = 'uacl-ref-' + Date.now();

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.getCourseDetails(this.activatedRoute.snapshot.params.slug);
  }

  getCourseDetails(slug: string): void {
    this.coursesService.getCourseDetails(slug).subscribe(res => {
      this.courseDetails = res;
       console.log('eeeeeee', res);
      // this.getCourseDetails(this.courseDetails.slug);
    });
  }

  paymentInit(): void {

  }

  paymentCancel(): void {

  }

  paymentDone($event: any): void {
    console.log('payment successful', $event);
    this.router.navigate([`/courses/lesson/${this.activatedRoute.snapshot.params.slug}`]).then();
  }

  continueLearning(): void {
    this.router.navigate([`/courses/lesson/${this.activatedRoute.snapshot.params.slug}`]).then();
  }
}
