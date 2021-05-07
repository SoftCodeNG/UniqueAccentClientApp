import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';

@Component({
  selector: 'app-about-course',
  templateUrl: './about-course.component.html',
  styleUrls: ['./about-course.component.scss']
})
export class AboutCourseComponent implements OnInit {
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
