import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  { path: 'page-number2',
    loadChildren: () => import('../page-number2/page-number2.module').then(m => m.PageNumber2Module) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
