import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubManagePage } from './club-manage.page';

const routes: Routes = [
  {
    path: '',
    component: ClubManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubManagePageRoutingModule {}
