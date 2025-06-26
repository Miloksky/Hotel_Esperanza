import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './components/cliente/client.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cliente', component: ClientComponent }, // ✅ nueva ruta
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

