import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  getQuizDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}quiz/getQuizDetails`)
      .pipe(
        map(res => {
          return res.payload;
        })
      );
  }
}

