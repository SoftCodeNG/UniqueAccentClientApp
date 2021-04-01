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

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CoursesComponent,
    ServicesComponent,
    CourseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatIconModule,
    MatExpansionModule,
    DragScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
