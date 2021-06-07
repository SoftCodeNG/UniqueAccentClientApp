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
          return res.results;
        })
      );
  }

  getCourseDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}courses/getCourseDetails/${slug}`)
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

  createComment(data: any): Observable<any> {
    const payload = new FormData();
    payload.append('lessonId', data.lessonId);
    payload.append('userId', data.userId);
    payload.append('comment', data.comment);
    return this.http.post<any>(`${this.baseURL}courses/createComment`, payload)
     .pipe(
        map(res => {
          return res.payload;
        })
      );
  }

  replyComment(data: any): Observable<any> {
    const payload = new FormData();
    payload.append('commentId', data.commentId);
    payload.append('userId', data.userId);
    payload.append('comment', data.comment);
    return this.http.post<any>(`${this.baseURL}courses/replyComment`, payload)
     .pipe(
        map(res => {
          return res.payload;
        })
      );
  }

  getLessonComments(lessonId: any): Observable<any> {
    return this.http.get<any>(`${this.baseURL}courses/getLessonComments/${lessonId}`)
     .pipe(
        map(res => {
          return res.payload;
        })
      );
  }
}
