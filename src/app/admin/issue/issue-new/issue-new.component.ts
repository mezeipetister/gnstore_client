import { Component, OnInit } from '@angular/core';
import { IssueNew, IssueLong } from 'src/app/class/issue';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-issue-new',
  templateUrl: './issue-new.component.html',
  styleUrls: ['./issue-new.component.css']
})
export class IssueNewComponent implements OnInit {

  // TODO: Error handling!
  issue: IssueNew = new IssueNew();
  submit() {
    this.http.put<IssueLong>("/issue/new", this.issue).subscribe((resp) => this.router.navigateByUrl("/a/issue/" + resp.id));
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

  }

}
