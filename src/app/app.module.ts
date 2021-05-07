import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragScrollModule} from 'ngx-drag-scroll';
import { CoursesComponent } from './pages/courses/courses.component';
import { ServicesComponent } from './pages/services/services.component';
import { CourseDetailsComponent } from './pages/courses/course-details/course-details.component';
import { CourseDetails2Component } from './pages/courses/course-details2/course-details2.component';
import { CourseDetails3Component } from './pages/courses/course-details3/course-details3.component';
import { CourseDetails4Component } from './pages/courses/course-details4/course-details4.component';
import { ServiceDetailsComponent } from './pages/services/service-details/service-details.component';
import { ServiceDetails2Component } from './pages/services/service-details2/service-details2.component';
import { ServiceDetails3Component } from './pages/services/service-details3/service-details3.component';
import { ServiceDetails4Component } from './pages/services/service-details4/service-details4.component';
import { ServiceDetails5Component } from './pages/services/service-details5/service-details5.component';
import { ServiceDetails6Component } from './pages/services/service-details6/service-details6.component';
import { ServiceDetails7Component } from './pages/services/service-details7/service-details7.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { LinksComponent } from './pages/links/links.component';
import { AboutComponent } from './pages/about/about.component';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {HttpClientModule} from '@angular/common/http';
import {AppState} from './store/app-store/app.state';
import { CourseListComponent } from './pages/courses/course-list/course-list.component';
import { CourseGridListComponent } from './pages/courses/course-grid-list/course-grid-list.component';
import { AboutCourseComponent } from './pages/courses/about-course/about-course.component';
import { CourseSectionComponent } from './pages/courses/course-section/course-section.component';
import { CourseNotFoundComponent } from './pages/courses/course-not-found/course-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CoursesComponent,
    ServicesComponent,
    CourseDetailsComponent,
    CourseDetails2Component,
    CourseDetails3Component,
    CourseDetails4Component,
    ServiceDetailsComponent,
    ServiceDetails2Component,
    ServiceDetails3Component,
    ServiceDetails4Component,
    ServiceDetails5Component,
    ServiceDetails6Component,
    ServiceDetails7Component,
    LinksComponent,
    CourseListComponent,
    CourseGridListComponent,
    AboutCourseComponent,
    CourseSectionComponent,
    CourseNotFoundComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MatIconModule,
    MatExpansionModule,
    DragScrollModule,
    MatTabsModule,
    MatCardModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
