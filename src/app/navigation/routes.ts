import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const navigationRoutes: Routes = [
  {
    path: 'club-create',
    loadChildren: () => import('src/app/pages/club/club-create/club-create.module').then((m) => m.ClubCreatePageModule),
  },
  {
    path: 'club-details',
    loadChildren: () =>
      import('src/app/pages/club/club-details/club-details.module').then((m) => m.ClubDetailsPageModule),
  },
  {
    path: 'club-manage/:clubId',
    loadChildren: () => import('src/app/pages/club/club-manage/club-manage.module').then((m) => m.ClubManagePageModule),
  },
  {
    path: 'event-create/:clubId',
    loadChildren: () => import('src/app/pages/event/create-event/create-event.module').then((m) => m.CreateEventPageModule)
  }
];

export default navigationRoutes;
