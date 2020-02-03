import { Component, OnInit } from '@angular/core';
import { ErrorResponse } from 'src/app/class/error-response';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/class/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = new Profile("", "", "");
  error: ErrorResponse | null = null;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Profile>('/profile').subscribe(
      (value) => this.profile = value,
      (err) => this.error = err.error);
  }

  submit() {
    this.isLoading = true;
    this.http.post<Profile>('/profile', this.profile).subscribe(
      (value) => {
        this.isLoading = false;
        this.profile = value;
      },
      (err) => {
        this.isLoading = false;
        this.error = err.error;
      }
    );
  }

}
