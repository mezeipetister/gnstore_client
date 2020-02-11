import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { DataService, Msg } from 'src/app/services/data/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/class/error-response';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Notification } from 'src/app/class/notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private ds: DataService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
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

    this.notificationService.notificationSubscribtion.subscribe(
      /**
       * Filter response to show just the unseen notifications
       */
      (val) => this.notifications = val.filter((item) => item.is_new));
  }

  isActive: boolean = false;
  quick$: Observable<ErrorResponse>;
  routerObserver: Subscription;
  username: string;

  ngOnInit() {
    this.notificationService.getData();
    this.loginService.getUserName();
  }

  set_notification_seen(id: number) {
    this.http.put('/notification/' + id + '/seen', null).subscribe();
  }

  logout() {
    let url = this.router.url;
    this.loginService.logout(url);
    this.router.navigateByUrl('/login');
  }

}
