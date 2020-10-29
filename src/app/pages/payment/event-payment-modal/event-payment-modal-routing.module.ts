import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPaymentModalPage } from './event-payment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EventPaymentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPaymentModalPageRoutingModule {}
