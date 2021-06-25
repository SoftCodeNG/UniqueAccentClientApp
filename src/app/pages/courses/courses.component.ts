import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../core/services/course.service";
import {Select, Store} from "@ngxs/store";
import {SetCourseList} from "../../store/app-store/app.action";
import {Observable} from "rxjs";
import {AppState} from "../../store/app-store/app.state";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  currentView = 'grid';
  allCourses: any[];

  @Select(AppState.getCourseList) courseList$: Observable<any>;
  constructor(
    private coursesService: CourseService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.courseList$.subscribe(res => {
      this.allCourses = res;
    });
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.coursesService.getAllCourses().subscribe(res => {
      console.log(res);
      this.store.dispatch(new SetCourseList(res));
    });
  }

  searchAllCourses(value: string): void {
    if (value) {
      this.coursesService.searchAllCourses(value).subscribe(res => {
        console.log(res);
        this.store.dispatch(new SetCourseList(res));
      });
    } else {
      this.getAllCourses();
    }
  }
}
