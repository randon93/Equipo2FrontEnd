import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';

import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { AuthGuard } from '@core';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'gestionar_libros',
        loadChildren: () => import('./manage-book/manage-book.module').then(m => m.ManageBookModule),
        data: { titleI18n: 'manageBook' },
      },
      { path: 'prestamos', loadChildren: () => import('./loan/loan.module').then(m => m.LoanModule), data: { titleI18n: 'loan' }, },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'Register' },
      },
    ],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule { }
