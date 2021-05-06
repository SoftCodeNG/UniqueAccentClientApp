import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {CoursesComponent} from './pages/courses/courses.component';
import {ServicesComponent} from './pages/services/services.component';
import {CourseDetailsComponent} from './pages/courses/course-details/course-details.component';
import {CourseDetails2Component} from './pages/courses/course-details2/course-details2.component';
import {CourseDetails3Component} from './pages/courses/course-details3/course-details3.component';
import {CourseDetails4Component} from './pages/courses/course-details4/course-details4.component';
import {ServiceDetailsComponent} from './pages/services/service-details/service-details.component';
import {ServiceDetails2Component} from './pages/services/service-details2/service-details2.component';
import {ServiceDetails3Component} from './pages/services/service-details3/service-details3.component';
import {ServiceDetails4Component} from './pages/services/service-details4/service-details4.component';
import {ServiceDetails5Component} from './pages/services/service-details5/service-details5.component';
import {ServiceDetails6Component} from './pages/services/service-details6/service-details6.component';
import {ServiceDetails7Component} from './pages/services/service-details7/service-details7.component';
import {LinksComponent} from './pages/links/links.component';
import {AboutComponent} from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'links',
    component: LinksComponent
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
  {
    path: 'services/service-details',
    component: ServiceDetailsComponent
  },
   {
    path: 'services/service-details2',
    component: ServiceDetails2Component
  },
   {
    path: 'services/service-details3',
    component: ServiceDetails3Component
  },
   {
    path: 'services/service-details4',
    component: ServiceDetails4Component
  },
   {
    path: 'services/service-details5',
    component: ServiceDetails5Component
  },
   {
    path: 'services/service-details6',
    component: ServiceDetails6Component
  },
   {
    path: 'services/service-details7',
    component: ServiceDetails7Component
  },
  {
    path: 'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
