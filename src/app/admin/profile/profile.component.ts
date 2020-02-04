import { Component, OnInit } from '@angular/core';
import { ErrorResponse } from 'src/app/class/error-response';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/class/profile';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpError } from 'src/app/class/http-error';
import { NewPassword } from 'src/app/class/new-password';
import { LoginService } from 'src/app/services/login/login.service';
import { Model } from 'src/app/class/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Model<Profile> = new Model<Profile>(this.http, '/profile', new Profile("", "", ""));
  password: Model<NewPassword> = new Model<NewPassword>(this.http, '/profile/new_password', new NewPassword("", ""));

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  ngOnInit() {
    this.http.get<Profile>('/profile').subscribe(
      (value) => this.profile.data = value,
      (err) => this.profile.error = err);
  }
}
