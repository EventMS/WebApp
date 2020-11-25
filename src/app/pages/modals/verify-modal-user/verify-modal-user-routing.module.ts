import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyModalUserPage } from './verify-modal-user.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyModalUserPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyModalUserPageRoutingModule {}
