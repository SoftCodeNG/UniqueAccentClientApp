import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseListComponent} from "./course-list/course-list.component";
import {AboutCourseComponent} from "./about-course/about-course.component";

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: ':slug',
    component: AboutCourseComponent
  },
  {
    path: '/lesson/:slug',
    component: AboutCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
