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
    this.issues.data = this.buffer.filter((c) =>
      c.title.toUpperCase().includes(this.filter.toUpperCase()));
    /**
     * Reset pagination
     */
    this.issues.navigate_to(1);
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<IssueShort[]>("/issue/all").subscribe((val) => {
      this.issues.set_data(val);
      this.buffer = val;
    });
  }
}
