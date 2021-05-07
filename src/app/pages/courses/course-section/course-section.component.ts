import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.scss']
})
export class CourseSectionComponent implements OnInit {
   public courseDetails: any;
   public lessonDetails: any;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getCourseDetails('accent-polishing-course1619136362.08034');
    this.getCourseLessons(36);
  }

  getCourseDetails(slug: string): void {
    this.coursesService.getCourseDetails(slug).subscribe(res => {
      this.courseDetails = res;
    });
  }

  getCourseLessons(id: number): void {
    this.coursesService.getCourseLessons(id).subscribe(res => {
      this.lessonDetails = res;
    });
  }
}
