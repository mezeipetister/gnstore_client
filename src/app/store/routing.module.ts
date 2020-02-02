import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent as LayoutEmpty } from "../layout/empty/empty.component";
import { MainComponent } from './main/main.component';
import { Page1Component as StorePage1 } from './page1/page1.component';

const routes: Routes = [
  {
    path: '', component: LayoutEmpty, children: [
      { path: '', component: MainComponent },
      // { path: 'ceges-adatok', component: StorePage1 },
    ]
  }

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
