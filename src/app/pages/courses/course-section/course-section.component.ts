import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.scss']
})
export class CourseSectionComponent implements OnInit {
   public courseDetails: any;
   public lessonDetails: any;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCourseDetails(this.activatedRoute.snapshot.params.slug);
  }

  getCourseDetails(slug: string): void {
    this.coursesService.getCourseDetails(slug).subscribe(res => {
      this.courseDetails = res;
      this.getCourseLessons(this.courseDetails.slug);
    });
  }

  getCourseLessons(id: number): void {
    this.coursesService.getCourseLessons(id).subscribe(res => {
      this.lessonDetails = res;
    });
  }
}
