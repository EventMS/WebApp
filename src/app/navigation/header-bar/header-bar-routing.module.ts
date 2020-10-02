import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderBarPage } from './header-bar.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderBarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderBarPageRoutingModule {}
