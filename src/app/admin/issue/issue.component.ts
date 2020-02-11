import { Component, OnInit } from '@angular/core';
import { IssueShort } from 'src/app/class/issue';
import { Pager } from 'src/app/class/pager';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.sass']
})
export class IssueComponent implements OnInit {
  filter: string = "";
  issues: Pager<IssueShort> = new Pager([], 10);
  buffer: IssueShort[] = null;

  filterSubmit() {
    /**
     * Filter data
     */
    this.issues.data = this.buffer.filter((i) =>
      i.title.toUpperCase().includes(this.filter.toUpperCase()));
    /**
     * Reset pagination
     */
    this.issues.navigate_to(1);
  }

  screenAll: boolean = true;
  screenOpen: boolean = false;
  screenClosed: boolean = false;

  showAll() {
    this.issues.data = this.buffer.filter((i) => i.is_open || !i.is_open);
    this.issues.navigate_to(1);
    this.screenAll = true;
    this.screenClosed = false;
    this.screenOpen = false;
  }
  showOpen() {
    this.issues.data = this.buffer.filter((i) => i.is_open);
    this.issues.navigate_to(1);
    this.screenAll = false;
    this.screenClosed = false;
    this.screenOpen = true;
  }
  showClosed() {
    this.issues.data = this.buffer.filter((i) => !i.is_open);
    this.issues.navigate_to(1);
    this.screenAll = false;
    this.screenClosed = true;
    this.screenOpen = false;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<IssueShort[]>("/issue/all").subscribe((val) => {
      this.issues.set_data(val);
      this.buffer = val;
    });
  }
}
