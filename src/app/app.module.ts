import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './store/main/main.component';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';
import { DataService } from './services/data/data.service';
import { LoginService } from './services/login/login.service';
import { LoginComponent } from './login/login/login.component';
import { EmptyComponent } from './layout/empty/empty.component';
import { PasswordresetComponent } from './login/passwordreset/passwordreset.component';
import { httpInterceptorProviders } from './interceptors';
import { NotificationService } from './services/notification/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainComponent,
    LoginComponent,
    PasswordresetComponent,
    EmptyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
    StoreModule,
    AppRoutingModule,
  ],
  providers: [DataService, LoginService, httpInterceptorProviders, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
