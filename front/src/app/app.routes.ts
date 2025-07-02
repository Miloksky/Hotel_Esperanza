import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'resources',
    loadComponent: () =>
      import('./components/resources/resources.component').then(m => m.ResourcesComponent),
    canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
