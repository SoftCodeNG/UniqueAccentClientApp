import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../core/services/course.service';
import {Select, Store} from '@ngxs/store';
import {SetCourseList, SetItemView} from '../../store/app-store/app.action';
import {Observable} from 'rxjs';
import {AppState} from '../../store/app-store/app.state';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  currentView: string;
  allCourses: any[];
  next: string;
  prev: string;

  @Select(AppState.getCourseList) courseList$: Observable<any>;
  @Select(AppState.getItemView) itemView$: Observable<any>;
  constructor(
    private coursesService: CourseService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.itemView$.subscribe(res => {
      this.currentView = res;
    });
    this.courseList$.subscribe(res => {
      this.allCourses = res.results;
      this.next = res.next;
      this.prev = res.previous;
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

  navigate(direction: string): void {
    this.coursesService.navigateCourses(direction).subscribe(res => {
      console.log(res);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.store.dispatch(new SetCourseList(res));
    });
  }

  setItemView(view: string): void {
    this.store.dispatch(new SetItemView(view));
  }
}
