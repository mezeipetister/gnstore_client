import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router, Event, NavigationEnd, RouterEvent, Scroll } from '@angular/router';
import { DataService, Msg } from 'src/app/services/data/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private ds: DataService, private http: HttpClient) {
    this.routerObserver = router.events.subscribe((e: Event) => {
      /**
       * IF Router Event
       */
      if (e instanceof NavigationEnd) {
        this.isActive = false;
      }
    });
  }

  isActive: boolean = false;
  quick$: Observable<Msg>;
  routerObserver: Subscription;

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
