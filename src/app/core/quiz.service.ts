import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  baseURL = environment.baseURL;

  // private _slug: string;

  constructor(private http: HttpClient) {
  }

  getQuizDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}quiz/getQuizDetails/${slug}`)
      .pipe(
        map(res => {
          return res.payload;
        })
      );
  }

  confirmPasscode(passcode: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}quiz/confirmPasscode/${passcode}`)
      .pipe(
        map(res => {
          return res.payload;
        })
      );
  }

  uploadMedia(file: any): Observable<any> {
    const payload = new FormData();
    payload.append('file', file);
    return this.http.post<any>(`${this.baseURL}media/uploadMedia`, payload)
      .pipe(
        map(res => {
          return res.payload;
        })
      );
  }
}

