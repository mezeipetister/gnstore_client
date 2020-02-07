import { Injectable } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';
import { Notification } from 'src/app/class/notification';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationSubscribers: Subject<Notification[]> = new Subject();
  notifications: Notification[] = [];
  notificationCrawler: Subscription = null;

  constructor(private http: HttpClient) {
    this.notificationCrawler = interval(2000).subscribe(() => this.getData());
  }

  getData() {
    this.http.get<Notification[]>('/notification').subscribe((resp) => this.notifications = resp);
    /**
     * Notifiy the subscibers about the new notifications
     */
    this.notificationSubscribers.next(this.notifications.filter((item) => item.is_new));
  }
}
