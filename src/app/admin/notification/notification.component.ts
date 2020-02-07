import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/class/notification';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[] = [];
  view: Scene = Scene.All;

  constructor(private http: HttpClient) { }

  render(page?: number): Notification[] {
    return [];
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get<Notification[]>('/notification').subscribe((resp) => this.notifications = resp);
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