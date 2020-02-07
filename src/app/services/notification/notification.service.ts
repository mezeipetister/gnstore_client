import { Injectable } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';
import { Notification } from 'src/app/class/notification';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Send all notifications to the subscibers
   * then filter it at client side
   */
  notificationSubscribtion: Subject<Notification[]> = new Subject();
  notificationCrawler: Subscription = null;

  constructor(private http: HttpClient) {
    this.notificationCrawler = interval(2000).subscribe(() => this.getData());
  }

  getData() {
    this.http.get<Notification[]>('/notification').subscribe((resp) => {
      /**
       * Notifiy the subscibers about the new notifications
       */
      this.notificationSubscribtion.next(resp);
    });
  }
}
