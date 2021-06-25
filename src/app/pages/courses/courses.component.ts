import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../core/services/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  currentView = 'grid';
  allCourses: any[];

  constructor(
    private coursesService: CourseService,
  ) {
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.coursesService.getAllCourses().subscribe(res => {
      console.log(res);
      this.allCourses = res;
    });
  }

  searchAllCourses(value: string): void {
    if (value) {
      this.coursesService.searchAllCourses(value).subscribe(res => {
        console.log(res);
        this.allCourses = res;
      });
    } else {
      this.getAllCourses();
    }
  }
}
