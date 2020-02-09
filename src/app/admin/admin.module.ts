import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule as AdminRouter } from './routing.module';
import { Page1Component as AdminPage1 } from './page1/page1.component';
import { Page2Component as AdminPage2 } from './page2/page2.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { PosComponent } from './pos/pos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ButtonSubmitComponent } from './partial/button-submit/button-submit.component';
import { ErrorDisplayComponent } from './partial/error-display/error-display.component';
import { IssueComponent } from './issue/issue.component';
import { NotificationComponent } from './notification/notification.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerNewComponent } from './customer/new/new.component';

@NgModule({
  declarations: [
    AdminPage1,
    AdminPage2,
    LayoutComponent,
    NavbarComponent,
    PosComponent,
    ProfileComponent,
    ButtonSubmitComponent,
    ErrorDisplayComponent,
    IssueComponent,
    NotificationComponent,
    CustomerComponent,
    CustomerNewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouter,
  ]
})
export class AdminModule { }
