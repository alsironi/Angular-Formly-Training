import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNumber2Component } from './page-number2.component';

const routes: Routes = [{ path: '', component: PageNumber2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNumber2RoutingModule { }
