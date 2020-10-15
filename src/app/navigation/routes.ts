import { Routes } from '@angular/router';

export const Paths = {
  start: 'start',
  signup: 'signup',
  login: 'login',
  club_create: 'club-create',
  club_details: 'club-details',
  club_list: 'club-list',
  show_club: {
    path: 'show-club/:name',
    route: (param: string) => ['show-club/', param],
  },
  club_manage: {
    path: 'club-manage/:clubId',
    route: (param: string) => ['club-manage/', param],
  },
};

const navigationRoutes: Routes = [
  {
    path: Paths.club_create,
    loadChildren: () => import('src/app/pages/club/club-create/club-create.module').then((m) => m.ClubCreatePageModule),
  },
  {
    path: Paths.club_details,
    loadChildren: () =>
      import('src/app/pages/club/club-details/club-details.module').then((m) => m.ClubDetailsPageModule),
  },
  {
    path: Paths.club_list,
    loadChildren: () => import('src/app/pages/club/club-list/club-list.module').then((m) => m.ClubListPageModule),
  },
  {
    path: Paths.club_manage.path,
    loadChildren: () => import('src/app/pages/club/club-manage/club-manage.module').then((m) => m.ClubManagePageModule),
  },
  {
    path: Paths.show_club.path,
    loadChildren: () => import('src/app/pages/club/show-club/show-club.module').then((m) => m.ShowClubPageModule),
  },
];

export default navigationRoutes;
