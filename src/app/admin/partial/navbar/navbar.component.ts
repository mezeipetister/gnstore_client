import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { DataService, Msg } from 'src/app/services/data/data.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private ds: DataService, private http: HttpClient) { }

  isActive: boolean = false;
  quick$: Observable<Msg>;

  ngOnInit() {
  }

  tryQuick() {
    this.ds.getQuick().subscribe({ next: (val) => console.log(val), error: (err) => console.log(err) });
  }

  letQuick() {
    this.quick$ = this.http.get<Msg>('/quick');
  }

  logout() {
    let url = this.router.url;
    this.loginService.logout(url);
    this.router.navigateByUrl('/login');
  }

}
