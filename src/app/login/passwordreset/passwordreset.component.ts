import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  email: string = '';
  isValid: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  resetPassword() {
    if (this.email.length > 0 && this.email.includes('@')) {
      this.isValid = true;
      alert('Reset email: ' + this.email);
    } else {
      this.isValid = false;
    }
  }

}
