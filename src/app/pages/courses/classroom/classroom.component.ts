import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../core/services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {AppState} from '../../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-course-section',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
   courseDetails: any;
   lessonList: any;
   currentLesson: any;
   userCourses: any;
   userData: any;
   descriptionLength = 500;
   commentForm: FormGroup;
   allComment: any[];
   courseIsPurchased = false;

   @Select(AppState.getUserProfile) userProfile$: Observable<any>;
   @Select(AppState.getUserCourses) userCourses$: Observable<string>;
  constructor(
    private coursesService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    screen.orientation.addEventListener('change', (screenOrientation) => {
      console.log('This is the orientation: ', screen.orientation.type);
      if (screenOrientation.isTrusted === true) {
        const orientation = screen.orientation.type;
        const video = document.getElementById('video') as HTMLVideoElement;

        if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
          console.log('That looks good.');
          video.requestFullscreen().then();
        } else if (orientation === 'portrait-secondary' || orientation === 'portrait-primary') {
          document.exitFullscreen().then();
        }

      }
    });
    this.userProfile$.subscribe(res => {
      this.userData = res;
      console.log(this.userData);
      this.setCommentForm();
    });
    this.userCourses$.subscribe(res => {
      this.userCourses = res;
    });
    this.getCourseDetails(this.activatedRoute.snapshot.params.slug);
  }

  setCommentForm(): void {
    this.commentForm = this.fb.group({
      lessonId: [this.currentLesson?.id, Validators.required],
      userId: [this.userData.userId, Validators.required],
      comment: ['', Validators.required],
    });
  }

  setCurrentLesson(data: any): void {
    this.currentLesson = null;
    this.currentLesson = data;
    this.commentForm.controls.lessonId.setValue(data.id);
    this.getLessonComments();
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

  getCourseLessons(slug: string): void {
    this.coursesService.getCourseLessons(slug).subscribe(res => {
      this.lessonList = res;
      this.setCurrentLesson(res[0]);
    });
  }

  createComment(): void {
    console.log(this.commentForm.value);
    if (this.commentForm.valid) {
      this.coursesService.createComment(this.commentForm.value).subscribe(res => {
        console.log('Comment Posted', res);
        this.getLessonComments();
        this.commentForm.controls.comment.reset();
      });
    }
  }

  replyComment(commentId, reply): void {
    console.log(commentId, reply);
    if (commentId && reply) {
      const payload = {
        commentId,
        userId: this.userData.userId,
        comment: reply
      };
      this.coursesService.replyComment(payload).subscribe(res => {
        this.getLessonComments();
      });
    }
  }

  getLessonComments(): void {
    this.coursesService.getLessonComments(this.currentLesson.id).subscribe(res => {
      console.log('List of all comment: ', res);
      this.allComment = res;
    });
  }

  redirectToCourseDetail(): boolean {
    this.router.navigate(['/courses/' + this.activatedRoute.snapshot.params.slug]).then((r) => {
      if (r === true) {
        this.toastr.error('You\'ve not purchased this course', 'Access denied');
      }
    });
    return true;
  }
}
