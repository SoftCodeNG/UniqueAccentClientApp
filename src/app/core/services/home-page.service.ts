import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

 getAllServices(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}settings/services/getAllServices`)
      .pipe(
        map(
          res => {
            return res.results;
          }
        )
      );
  }
}
