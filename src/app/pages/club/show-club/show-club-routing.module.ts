import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowClubPage } from './show-club.page';

const routes: Routes = [
  {
    path: '',
    component: ShowClubPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowClubPageRoutingModule {}
