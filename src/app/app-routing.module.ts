import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {ServicesComponent} from './pages/services/services.component';
import { QuizEndComponent } from './pages/quiz/quiz-end/quiz-end.component';
import { QuizInstructionComponent } from './pages/quiz/quiz-instruction/quiz-instruction.component';
import { Quiz1Component } from './pages/quiz/quiz1/quiz1.component';
import { Quiz2Component } from './pages/quiz/quiz2/quiz2.component';
import {ServiceDetailsComponent} from './pages/services/service-details/service-details.component';
import {ServiceDetails2Component} from './pages/services/service-details2/service-details2.component';
import {ServiceDetails3Component} from './pages/services/service-details3/service-details3.component';
import {ServiceDetails4Component} from './pages/services/service-details4/service-details4.component';
import {ServiceDetails5Component} from './pages/services/service-details5/service-details5.component';
import {ServiceDetails6Component} from './pages/services/service-details6/service-details6.component';
import {ServiceDetails7Component} from './pages/services/service-details7/service-details7.component';
import {LinksComponent} from './pages/links/links.component';
import {AboutComponent} from './pages/about/about.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {AuthGuard} from './core/guards/auth-guard';

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
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'links',
    component: LinksComponent
  },
   {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./pages/quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  // {
  //   path: 'end-quiz',
  //   component: QuizEndComponent
  // },
  // {
  //   path: 'start-quiz',
  //   component: QuizSectionComponent
  // },
  // {
  //   path: 'quiz1',
  //   component: Quiz1Component
  // },
  // {
  //   path: 'quiz2',
  //   component: Quiz2Component
  // },
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
