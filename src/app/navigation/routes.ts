import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const navigationRoutes = [
  {
    path: 'club-create',
    loadChildren: () => import('src/app/pages/club/club-create/club-create.module').then((m) => m.ClubCreatePageModule),
  },
  {
    path: 'club-details',
    loadChildren: () =>
      import('src/app/pages/club/club-details/club-details.module').then((m) => m.ClubDetailsPageModule),
  },
];

export default navigationRoutes;
