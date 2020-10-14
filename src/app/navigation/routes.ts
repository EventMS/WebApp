export const Paths = {
  start: 'start',
  signup: 'signup',
  login: 'login',
  club_create: 'club-create',
  club_details: 'club-details',
  club_list: 'club-list',
  show_club: 'show-club/:name',
};

const navigationRoutes = [
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
    path: Paths.show_club,
    loadChildren: () => import('src/app/pages/club/show-club/show-club.module').then((m) => m.ShowClubPageModule),
  },
];

export default navigationRoutes;
