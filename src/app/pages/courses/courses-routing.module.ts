import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseGridComponent  } from './course-grid/course-grid.component';
import {CourseDetailsComponent} from './course-details/course-details.component';
import {ClassroomComponent} from './classroom/classroom.component';
import {AuthGuard} from '../../core/guards/auth-guard';
import {CoursesComponent} from "./courses.component";
import {CourseNotFoundComponent} from "./course-not-found/course-not-found.component";

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: ':slug',
    component: CourseDetailsComponent
  },
  {
    path: 'classroom/:slug',
    component: ClassroomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: CourseNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
