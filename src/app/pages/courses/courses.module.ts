import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseGridComponent} from './course-grid/course-grid.component';
import {CourseDetailsComponent} from './course-details/course-details.component';
import {Angular4PaystackModule} from 'angular4-paystack';
import {ClassroomComponent} from './classroom/classroom.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CourseListComponent,
    CourseGridComponent,
    CourseDetailsComponent,
    ClassroomComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    Angular4PaystackModule,
    ReactiveFormsModule,
  ],
  exports: [
    CourseGridComponent,
    CourseListComponent
  ]
})
export class CoursesModule { }
