import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import navigationRoutes from '../routes';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: navigationRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
