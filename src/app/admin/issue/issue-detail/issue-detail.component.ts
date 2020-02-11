import { Component, OnInit } from '@angular/core';
import { IssueLong } from 'src/app/class/issue';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  id: string = this.route.snapshot.paramMap.get("id");
  issue: IssueLong = new IssueLong("", "", "", "", new Date(), [], "", 0, [], [], true);
  comment: string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    // TODO: Error handling!
    this.http.get<IssueLong>("/issue/" + this.id).subscribe((val) => this.issue = val);
  }

  closeIssue() {
    this.http.post<IssueLong>("/issue/" + this.id + "/close", []).subscribe((val) => this.issue = val);
  }

  openIssue() {
    this.http.post<IssueLong>("/issue/" + this.id + "/open", []).subscribe((val) => this.issue = val);
  }

  commentIssue() {
    this.http.post<IssueLong>("/issue/" + this.id + "/comment", { text: this.comment }).subscribe((val) => this.issue = val);
  }

}
