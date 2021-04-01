import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {CoursesComponent} from './pages/courses/courses.component';
import {ServicesComponent} from './pages/services/services.component';
import {CourseDetailsComponent} from './pages/courses/course-details/course-details.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
