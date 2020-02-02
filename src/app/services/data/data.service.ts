import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, delay, retryWhen, mergeMap, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient, private router: Router) { }

  getQuick(): Observable<Msg> {
    return (new Request(this.http)).get<Msg>('/quick').pipe(catchError((error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }));
    // tap({
    //   error: (err) => {
    //     if (err.status == 0) {
    //       console.log('Ooooo loading failed. Message: ' + err.message);
    //       this.router.navigateByUrl('/');
    //     }
    //   }
    // })
  }

  getLong(): Observable<Msg> {
    return (new Request(this.http)).get('/long');
  }

  login(username: string, password: string): Observable<Login> {
    return (new Request(this.http)).post('/login', { username: username, password: password });
  }

}

export interface Msg {
  msg: string,
}

export class Login {
  token: string
}

// class Options {
//   headers: HttpHeaders;
//   constructor(token: string) {
//     this.headers = new HttpHeaders({
//       'Token': token
//     })
//   }
// }

class Request {
  // root: string = 'http://localhost:7000';
  // options: Options;
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
    // this.options = new Options('eyJ0eXAiOiJKV1QiLCJraWQiOm51bGwsImFsZyI6IkhTMjU2In0.eyJ1aWQiOiJhZG1pbiIsInJoaW5vIjp0cnVlfQ.PpcImetmYA0VZd7fiUR2of/sBe62b3bOlp7uNYlNnEo');
  }
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}