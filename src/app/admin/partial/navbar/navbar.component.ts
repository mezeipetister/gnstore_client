import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { DataService, Msg } from 'src/app/services/data/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/class/error-response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private ds: DataService, private http: HttpClient) {
    // Register username observer
    this.loginService.userName.subscribe((val) => this.username = val);

    this.routerObserver = router.events.subscribe((e: Event) => {
      /**
       * IF Router Event
       */
      if (e instanceof NavigationEnd) {
        this.isActive = false;
      }
    });
  }

  isActive: boolean = false;
  quick$: Observable<ErrorResponse>;
  routerObserver: Subscription;
  username: string;

  ngOnInit() {
    this.loginService.getUserName();
  }

  tryQuick() {
    this.ds.getQuick().subscribe({ next: (val) => console.log(val), error: (err) => console.log(err) });
  }

  // letQuick() {
  //   this.quick$ = this.http.get<ErrorResponse>('/quick').pipe(catchError((err) => {
  //     console.log(err.error);
  //     return of(new Msg(''));
  //   }));
  // }

  logout() {
    let url = this.router.url;
    this.loginService.logout(url);
    this.router.navigateByUrl('/login');
  }

}
