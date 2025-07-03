import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './components/cliente/client.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomListComponent } from './components/admin/room-list/room-list.component';
import { RoomManagementComponent } from './components/admin/room-management/room-management.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard'

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cliente', component: ClientComponent },
  { path: 'reservations',component : ReservationsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/rooms-list', component: RoomListComponent },
  { path: 'admin/room-management', component: RoomManagementComponent },
  { path: 'admin/room-management/:id', component: RoomManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
]; 


