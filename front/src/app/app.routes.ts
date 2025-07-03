import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './components/cliente/client.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ReservationsEditComponent } from './components/reservations-edit/reservations-edit.component';
import { AppComponent } from './app.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'cliente/:id', component: ClientComponent,canActivate: [authGuard] },
  { path: 'reservations',component : ReservationsComponent},
  { path: 'reservations/edit/:id', component: ReservationsEditComponent,canActivate: [authGuard]},
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {
    path: 'resources',
    loadComponent: () =>
      import('./components/resources/resources.component').then(m => m.ResourcesComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
  
]

