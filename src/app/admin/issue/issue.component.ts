import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.sass']
})
export class IssueComponent implements OnInit {
  /**
   * Tag
   * - id: uzise,
   * - label: String,
   * - style: String,
   * 
   * Issue
   * - id: usize,
   * - date_created: DateTime<Utc>,
   * - created_by: String
   * - description: String,
   * - assigned_to: String,
   * - subscribers: Vec<String>,
   * - comments: Vec<Comment>,
   * - is_open: bool,
   * - tags: Vec<Tag>,
   */
  constructor() { }

  ngOnInit() {
  }

}
