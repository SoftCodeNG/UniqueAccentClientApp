import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';
import {ActivatedRoute} from "@angular/router";
import {Select} from "@ngxs/store";
import {AppState} from "../../../store/app-store/app.state";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.scss']
})
export class CourseSectionComponent implements OnInit {
   courseDetails: any;
   lessonList: any;
   currentLesson: any;
   userData: any;
   commentForm: FormGroup;

   @Select(AppState.getDecodedToken) decodedToken$: Observable<any>;
  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.decodedToken$.subscribe(res => {
      this.userData = res;
      console.log(this.userData);
      this.setCommentForm();
    });
    this.getCourseDetails(this.activatedRoute.snapshot.params.slug);
  }

  setCommentForm(): void {
    this.commentForm = this.fb.group({
      lessonId: [this.currentLesson?.id, Validators.required],
      userId: [this.userData.user_id, Validators.required],
      comment: ['', Validators.required],
    });
  }

  setCurrentLesson(data: any): void {
    this.currentLesson = data;
    this.commentForm.controls.lessonId.setValue(data.id);
  }

  getCourseDetails(slug: string): void {
    this.coursesService.getCourseDetails(slug).subscribe(res => {
      this.courseDetails = res;
      this.getCourseLessons(this.courseDetails.slug);
    });
  }

  getCourseLessons(id: number): void {
    this.coursesService.getCourseLessons(id).subscribe(res => {
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
      });
    }
  }

  replyComment(commentId, reply): void {
    if (commentId && reply) {
      const payload = {
        commentId,
        userId: this.userData.user_id,
        comment: reply
      };
      this.coursesService.createComment(payload).subscribe(res => {
        console.log('Comment Posted', res);
      });
    }
  }

  getLessonComments(): void {
    this.coursesService.getLessonComments(this.currentLesson.id).subscribe(res => {
      console.log('List of all comment: ', res);
    });
  }
}
