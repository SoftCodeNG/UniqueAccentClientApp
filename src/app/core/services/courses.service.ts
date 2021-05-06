import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}courses/getCourses`)
      .pipe(
        map(res => {
          return res.payload;
        })
      );
  }

  getCourseDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}courses/getCoursesDetail/${slug}`)
     .pipe(
        map(res => {
          return res.payload;
        })
      );
  }

  getCourseLessons(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}courses/getCourseLessons/${id}`)
     .pipe(
        map(res => {
          return res.payload;
        })
      );
  }

  getLessonDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}courses/getLessonDetail/${slug}`)
     .pipe(
        map(res => {
          return res.payload;
        })
      );
  }
}
