import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';

@Component({
  selector: 'app-about-course',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
   public courseDetails: any;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getCourseDetails('accent-polishing-course1619136362.08034');
  }

  getCourseDetails(slug: string): void {
    this.coursesService.getCourseDetails(slug).subscribe(res => {
      this.courseDetails = res;
    });
  }
}
