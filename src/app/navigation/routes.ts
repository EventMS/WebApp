import { Routes } from '@angular/router';

export const Paths = {
  dashboard: 'dashboard',
  start: 'start',
  signup: 'signup',
  login: 'login',
  club_create: 'club-create',
  club_list: 'club-list',
  event_list: 'event-list',
  my_clubs: 'my-clubs',
  my_events: 'my-events',
  show_club: {
    path: 'show-club/:clubId',
    route: (param: string) => ['show-club/', param],
  },
  club_manage: {
    path: 'club-manage/:clubId',
    route: (param: string) => ['club-manage/', param],
  },
  event_page: {
    path: 'event-page/:eventId',
    route: (param: string) => ['/event-page/', param],
  },
  event_create: {
    path: 'event-create/:clubId',
    route: (param: string) => ['event-create/', param],
  },
};

const navigationRoutes: Routes = [
  {
    path: Paths.dashboard,
    loadChildren: () =>
      import('src/app//pages/dashboard/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: Paths.club_create,
    loadChildren: () => import('src/app/pages/club/club-create/club-create.module').then((m) => m.ClubCreatePageModule),
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
  {
    path: Paths.event_page.path,
    loadChildren: () => import('src/app/pages/event/event-page/event-page.module').then((m) => m.EventPagePageModule),
  },
  {
    path: Paths.event_list,
    loadChildren: () => import('src/app/pages/event/event-list/event-list.module').then((m) => m.EventListPageModule),
  },
  {
    path: Paths.event_create.path,
    loadChildren: () =>
      import('src/app/pages/event/create-event/create-event.module').then((m) => m.CreateEventPageModule),
  },
  {
    path: Paths.my_clubs,
    loadChildren: () => import('src/app/pages/club/myclubs/myclubs.module').then((m) => m.MyclubsPageModule),
  },
  {
    path: Paths.my_events,
    loadChildren: () => import('src/app/pages/event/myevents/myevents.module').then((m) => m.MyeventsPageModule)
  },
  {
    path: '',
    redirectTo: Paths.dashboard
  }
];

export default navigationRoutes;
