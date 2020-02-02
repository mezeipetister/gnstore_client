import { Injectable } from '@angular/core';
import { Subject, EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, Login } from '../data/data.service';
import { Ok, Err, Result } from 'ts-results';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  redirectUrl: string = '';

  constructor(private dataService: DataService) {
    // this.ping();
  }

  // Notification service
  // Publishin login status to subscribers
  // isLoggedIn: Subject<boolean> = new Subject<boolean>();

  ping: () => boolean = function (): boolean {
    let token = this.getToken();
    // If user logged in, then notify subscibers
    if (token.ok) {
      return true;
      // this.notifyLoginStatus(true);
    } else {
      return false;
      // this.notifyLoginStatus(false);
    }
  }

  // notifyLoginStatus(status: boolean) {
  //   this.isLoggedIn.next(status);
  // }

  setToken(token: string): Result<void, Error> {
    try {
      localStorage.setItem('token', token);
      // Notify login subscribers
      // this.notifyLoginStatus(true);
      return Ok.EMPTY;
    } catch (e) {
      // Notify login subscribers
      // this.notifyLoginStatus(false);
      return new Err(e);
    }
  }

  getToken: () => Result<string, Error> = function (): Result<string, Error> {
    if (localStorage.getItem('token') != null) {
      return new Ok(localStorage.getItem('token'));
    }
    return new Err(new Error("Token not exists"));
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      this.dataService.login(username, password).subscribe({
        next: (data: Login) => {
          this.setToken(data.token).unwrap();
          observer.next(true);
        },
        error: (err) => {
          observer.next(false)
        },
        complete: () => observer.complete()
      })
    })
  }

  logout(url: string): void {
    this.redirectUrl = url;
    // Removing stored auth token
    localStorage.removeItem('token');
    // Notify subscribers
    // this.notifyLoginStatus(false);
  }

}
