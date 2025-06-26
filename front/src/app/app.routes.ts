import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
<<<<<<< HEAD
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {path: 'home',component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  {path: '',redirectTo : 'home',pathMatch:'full'},
  {path:'**',redirectTo : 'home'}

=======
import { ClientComponent } from './components/cliente/client.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cliente', component: ClientComponent }, // ✅ nueva ruta
  {path: 'reservations',component : ReservationsComponent},
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
>>>>>>> a06ef57ad3e725d7fba7ed6906e9042d183d3faf
];

