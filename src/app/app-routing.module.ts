import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Paths } from './navigation/routes';

const routes: Routes = [
  {
    path: Paths.start,
    loadChildren: () => import('./pages/auth/start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: Paths.signup,
    loadChildren: () => import('./pages/auth/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: Paths.login,
    loadChildren: () => import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./navigation/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'myclubs',
    loadChildren: () => import('./pages/club/myclubs/myclubs.module').then( m => m.MyclubsPageModule)
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
