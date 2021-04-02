import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {CoursesComponent} from './pages/courses/courses.component';
import {ServicesComponent} from './pages/services/services.component';
import {CourseDetailsComponent} from './pages/courses/course-details/course-details.component';
import {CourseDetails2Component} from './pages/courses/course-details2/course-details2.component';
import {CourseDetails3Component} from './pages/courses/course-details3/course-details3.component';
import {CourseDetails4Component} from './pages/courses/course-details4/course-details4.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
   {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'courses/course-details',
    component: CourseDetailsComponent
  },
  {
    path: 'courses/course-details2',
    component: CourseDetails2Component
  },
  {
    path: 'courses/course-details3',
    component: CourseDetails3Component
  },
  {
    path: 'courses/course-details4',
    component: CourseDetails4Component
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
