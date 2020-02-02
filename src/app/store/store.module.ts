import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule as StoreRouter } from './routing.module';
import { Page1Component as StorePage1 } from './page1/page1.component';

@NgModule({
  declarations: [
    StorePage1,
  ],
  imports: [
    CommonModule,
    StoreRouter,
  ]
})
export class StoreModule { }
