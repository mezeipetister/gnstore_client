import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule as AdminRouter } from './routing.module';
import { Page1Component as AdminPage1 } from './page1/page1.component';
import { Page2Component as AdminPage2 } from './page2/page2.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { PosComponent } from './pos/pos.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminPage1,
    AdminPage2,
    LayoutComponent,
    NavbarComponent,
    PosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRouter,
  ]
})
export class AdminModule { }
