import { Routes } from '@angular/router';
import { AuthGuard } from './users/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard',canActivate: [AuthGuard], loadComponent: () => import('./main/main.component').then(c => c.MainComponent)},
    {path: 'login', loadComponent: () => import('./users/login/login.component').then(c => c.LoginComponent)},
];
