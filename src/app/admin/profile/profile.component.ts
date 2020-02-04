import { Component, OnInit } from '@angular/core';
import { ErrorResponse } from 'src/app/class/error-response';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/class/profile';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpError } from 'src/app/class/http-error';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = new Profile("", "", "");
  error: HttpError | null = null;
  isLoading: boolean = false;
  isOk: boolean = false;
  saving: Subscription = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Profile>('/profile').subscribe(
      (value) => this.profile = value,
      (err) => this.error = err);
  }

  submit() {
    this.isLoading = true;
    this.saving = this.http.post<Profile>('/profile', this.profile).subscribe(
      (value) => {
        this.isLoading = false;
        this.isOk = true;
        interval(1500).pipe(take(1)).subscribe(() => this.isOk = false);
        this.profile = value;
      },
      (err) => {
        this.isLoading = false;
        this.error = err;
      }
    );
  }

}
