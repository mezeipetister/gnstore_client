import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(private form: FormBuilder) { }

  fname: string = '';
  lname: string = '';
  name: Name = { firstName: '', lastName: '' };

  profileForm: FormGroup;

  setName() {
    this.name = Object.assign({}, this.profileForm.value);
  }

  getName(): string {
    return this.name.firstName + this.name.lastName;
  }

  ngOnInit() {
    this.profileForm = this.form.group(new Name('', ''));
  }

}

class Name {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}