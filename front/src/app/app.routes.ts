import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

export const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'reservations',component : ReservationsComponent},
  {path: '',redirectTo : 'home',pathMatch:'full'},
  {path:'**',redirectTo : 'home'}

];
