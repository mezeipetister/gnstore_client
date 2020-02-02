import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  isUsernameValid: boolean = true;
  isPasswordValid: boolean = true;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }

  validateForm() {
    this.isPasswordValid = true;
    this.isUsernameValid = true;
    if (this.username.length == 0) {
      this.isUsernameValid = false;
    }
    if (this.password.length == 0) {
      this.isPasswordValid = false;
    }
  }

  login() {
    this.validateForm();
    if (this.isUsernameValid && this.isPasswordValid) {
      this.loginService.login(this.username, this.password).subscribe((r) => {
        if (r) {
          let redirect = this.loginService.redirectUrl
            ? this.router.parseUrl(this.loginService.redirectUrl)
            : '/';
          this.router.navigateByUrl(redirect);
        }
      });
    }
  }

}
