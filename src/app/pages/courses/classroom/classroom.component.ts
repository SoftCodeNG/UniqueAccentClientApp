import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';
import {ActivatedRoute} from '@angular/router';
import {Select} from '@ngxs/store';
import {AppState} from '../../../store/app-store/app.state';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-course-section',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
   courseDetails: any;
   lessonList: any;
   currentLesson: any;
   userData: any;
   commentForm: FormGroup;
   allComment: any[];

   @Select(AppState.getUserProfile) userProfile$: Observable<any>;
  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.userProfile$.subscribe(res => {
      this.userData = res;
      console.log(this.userData);
      this.setCommentForm();
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
    this.currentLesson = data;
    this.commentForm.controls.lessonId.setValue(data.id);
    this.getLessonComments();
  }

  getCourseDetails(slug: string): void {
    this.coursesService.getCourseDetails(slug).subscribe(res => {
      this.courseDetails = res;
      this.getCourseLessons(this.courseDetails.slug);
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
        userId: this.userData.user_id,
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
}
