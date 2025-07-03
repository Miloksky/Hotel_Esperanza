import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  
  const token: string | null = localStorage.getItem('token');
  if (token === null) {
    console.warn(' No hay token, redirigiendo a login');
    router.navigate(['/login']);
    return false;
  }

  return true;
}