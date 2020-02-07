import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/class/notification';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[] = [];
  view: Scene = Scene.All;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.notificationService.notificationSubscribtion.subscribe((val) => this.notifications = val);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // Request a direct data pull from server
    this.notificationService.getData();
  }

  delete(id: number) {
    this.http.delete('/notification/' + id).subscribe(() => this.getData());
  }

  set_seen(id: number) {
    this.http.put('/notification/' + id + '/seen', null).subscribe(() => this.getData());
  }

}

enum Scene {
  All,
  Read,
  UnRead
}