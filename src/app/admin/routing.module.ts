import { NgModule, RootRenderer } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page1Component as AdminPage1 } from './page1/page1.component';
import { Page2Component as AdminPage2 } from './page2/page2.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../guard/auth.guard';
import { PosComponent } from './pos/pos.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'a', component: LayoutComponent, canActivateChild: [AuthGuard], children: [
      { path: '', component: AdminPage1 },
      { path: 'pos', component: PosComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'page2', component: AdminPage2 }
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
