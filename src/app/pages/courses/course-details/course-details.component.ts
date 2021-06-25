import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../../core/services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {SetUserCourses} from "../../../store/app-store/app.action";

@Component({
  selector: 'app-about-course',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseDetails: any;
  userCourses: any;
  userProfile: any;
  lessonList: any;
  courseIsPurchased = false;
  descriptionLength = 500;
  reference = 'uacl-ref-' + Date.now();

  @Select(AppState.getUserProfile) userProfile$: Observable<any>;
  @Select(AppState.getUserCourses) userCourses$: Observable<string>;
  constructor(
    private coursesService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private store: Store,
  ){ }

  ngOnInit(): void {
    this.userCourses$.subscribe(res => {
      this.userCourses = res;
    });
    this.userProfile$.subscribe(res => {
      this.userProfile = res;
    });
    this.getCourseDetails(this.activatedRoute.snapshot.params.slug);
  }

  getCourseDetails(slug: string): void {
    this.coursesService.getCourseDetails(slug).subscribe(res => {
      this.courseDetails = res;
      this.getCourseLessons(this.courseDetails.slug);
      this.userCourses.forEach(r => {
        if (r.id === this.courseDetails.id) {
          this.courseIsPurchased = true;
        }
      });
    });
  }

  paymentInit(): void {

  }

  paymentCancel(): void {

  }

  paymentDone($event: any): void {
    console.log('payment successful', $event);
    this.grantUserCourseAccess();
  }

  grantUserCourseAccess(): void {
    this.coursesService.grantUserCourseAccess(this.userProfile.userId, this.courseDetails.id).subscribe(() => {
      this.toastr.success('Payment Successful');
      this.getUserCourses(this.userProfile.userId);
    });
  }

  getUserCourses(userId: number): void {
    this.coursesService.getUserCourses(userId).subscribe(res => {
      this.store.dispatch(new SetUserCourses(res));
      this.router.navigate([`/courses/classroom/${this.activatedRoute.snapshot.params.slug}`]).then();
    });
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
