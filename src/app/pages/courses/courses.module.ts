import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseGridListComponent} from "./course-grid-list/course-grid-list.component";

@NgModule({
  declarations: [
    CourseListComponent,
    CourseGridListComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
  ],
})
export class CoursesModule { }
