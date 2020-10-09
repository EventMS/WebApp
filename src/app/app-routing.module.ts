import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'start',
    loadChildren: () => import('./pages/auth/start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./navigation/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'club-list',
    loadChildren: () => import('./pages/club/club-list/club-list.module').then( m => m.ClubListPageModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
