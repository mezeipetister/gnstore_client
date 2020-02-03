import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  error: string | null = null;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.loginService.login(this.username, this.password).subscribe((r) => {
      if (r) {
        let redirect = this.loginService.redirectUrl
          ? this.router.parseUrl(this.loginService.redirectUrl)
          : '/';
        this.router.navigateByUrl(redirect);
      }
    },
      (error) => this.error = error.error.message)
  }

}
