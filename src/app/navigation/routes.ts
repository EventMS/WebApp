import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const navigationRoutes = [{
    path: 'tab1',
    loadChildren: () => import("src/app/pages/tab1/tab1.module").then((m) => m.Tab1PageModule),
  },
  {
    path: 'tab2',
    loadChildren: () => import("src/app/pages/tab2/tab2.module").then((m) => m.Tab2PageModule),
  },
  {
    path: 'tab3',
    loadChildren: () => import("src/app/pages/tab3/tab3.module").then((m) => m.Tab3PageModule),
  },
  {
    path: 'club-create',
    loadChildren: () => import('src/app/pages/club/club-create/club-create.module').then((m) => m.ClubCreatePageModule),
  },
  {
    path: 'club-details',
    loadChildren: () => import('src/app/pages/club/club-details/club-details.module').then((m) => m.ClubDetailsPageModule)
  },
  {
    path: 'club-manage/:clubName',
    loadChildren: () => import('src/app/pages/club/club-manage/club-manage.module').then((m) => m.ClubManagePageModule),
  }
]

export default navigationRoutes