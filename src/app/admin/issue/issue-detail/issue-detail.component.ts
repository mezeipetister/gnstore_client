import { Component, OnInit } from '@angular/core';
import { IssueLong } from 'src/app/class/issue';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/class/profile';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  dropdownActive: boolean = false;
  id: string = this.route.snapshot.paramMap.get("id");
  issue: IssueLong = new IssueLong("", "", "", "", new Date(), [], "", 0, [], [], true);
  comment: string = "";
  users: Profile[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  closeIssue() {
    this.http.post<IssueLong>("/issue/" + this.id + "/close", []).subscribe((val) => this.issue = val);
  }

  openIssue() {
    this.http.post<IssueLong>("/issue/" + this.id + "/open", []).subscribe((val) => this.issue = val);
  }

  commentIssue() {
    this.http.post<IssueLong>("/issue/" + this.id + "/comment", { text: this.comment }).subscribe((val) => {
      this.issue = val;
      this.comment = "";
    });
  }

  loadUsers() {
    this.http.get<Profile[]>("/user/all").subscribe((val) => this.users = val);
  }

  assignTo(user: string) {
    this.http.post<IssueLong>("/issue/" + this.id + "/assign_to/" + user, []).subscribe((val) => this.issue = val);
  }

  ngOnInit() {
    // TODO: Error handling!
    this.http.get<IssueLong>("/issue/" + this.id).subscribe((val) => this.issue = val);
    this.loadUsers();
  }

}
