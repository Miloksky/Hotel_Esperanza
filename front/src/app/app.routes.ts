import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {path: 'home',component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  {path: '',redirectTo : 'home',pathMatch:'full'},
  {path:'**',redirectTo : 'home'}

];
