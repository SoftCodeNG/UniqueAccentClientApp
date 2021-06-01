import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../core/services/courses.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-grid-list',
  templateUrl: './course-grid-list.component.html',
  styleUrls: ['./course-grid-list.component.scss']
})
export class CourseGridListComponent implements OnInit {
 allCourses: any[];

  constructor(
    private coursesService: CoursesService,
    // private activatedRoute: ActivatedRoute
  ) { }

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
