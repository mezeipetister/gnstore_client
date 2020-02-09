import { NgModule, RootRenderer } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page1Component as AdminPage1 } from './page1/page1.component';
import { Page2Component as AdminPage2 } from './page2/page2.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../guard/auth.guard';
import { PosComponent } from './pos/pos.component';
import { ProfileComponent } from './profile/profile.component';
import { IssueComponent } from './issue/issue.component';
import { NotificationComponent } from './notification/notification.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerNewComponent } from './customer/new/new.component';
import { EmptyComponent } from '../layout/empty/empty.component';

const routes: Routes = [
  {
    path: 'a', component: LayoutComponent, canActivateChild: [AuthGuard], children: [
      { path: '', component: AdminPage1 },
      { path: 'pos', component: PosComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'customer', component: EmptyComponent, children: [
          { path: '', component: CustomerComponent },
          { path: 'new', component: CustomerNewComponent }
        ]
      },
      { path: 'issue', component: IssueComponent },
      { path: 'notification', component: NotificationComponent }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
