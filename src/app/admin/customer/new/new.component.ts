import { Component, OnInit } from '@angular/core';
import { CustomerNew } from 'src/app/class/customer-new';
import { HttpClient } from '@angular/common/http';
import { Model } from 'src/app/class/model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class CustomerNewComponent implements OnInit {

  customer: Model<CustomerNew> = new Model<CustomerNew>(this.http, "/customer/new", new CustomerNew("", "", "", "", "", "", ""));

  submit() {
    this.http.post<CustomerNew>("/customer/new", this.customer).subscribe();
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
