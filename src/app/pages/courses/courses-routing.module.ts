import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseListComponent} from './course-list/course-list.component';
import { CourseGridListComponent  } from './course-grid-list/course-grid-list.component';

import {CourseDetailsComponent} from './course-details/course-details.component';
import {CourseSectionComponent} from "./course-section/course-section.component";

const routes: Routes = [
  {
    path: '',
    component: CourseGridListComponent
  },
  {
    path: ':slug',
    component: CourseDetailsComponent
  },
  {
    path: 'lesson/:slug',
    component: CourseSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
