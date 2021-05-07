import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';

@Component({
  selector: 'app-course-grid-list',
  templateUrl: './course-grid-list.component.html',
  styleUrls: ['./course-grid-list.component.scss']
})
export class CourseGridListComponent implements OnInit {
 allCourses: any[];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.coursesService.getAllCourses().subscribe(res => {
      console.log(res);
      this.allCourses = res;
    });
  }
}
