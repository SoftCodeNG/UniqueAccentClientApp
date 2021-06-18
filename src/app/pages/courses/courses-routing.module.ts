import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseGridListComponent  } from './course-grid-list/course-grid-list.component';
import {CourseDetailsComponent} from './course-details/course-details.component';
import {ClassroomComponent} from './classroom/classroom.component';
import {AuthGuard} from '../../core/guards/auth-guard';

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
    path: 'classroom/:slug',
    component: ClassroomComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
