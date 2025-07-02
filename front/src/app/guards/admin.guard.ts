// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// export const adminGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // Primero comprobamos que el usuario esté logueado
//   if (!authService.isLoggedIn()) {
//     router.navigate(['/login']);
//     return false;
//   }

//   // Aquí asumimos que tienes un método para obtener los datos del usuario, incluyendo rol
//   const user = authService.getUser();

//   if (user && user.role === 'admin') {
//     return true; // Permite acceso solo si es admin
//   }

//   // Si no es admin, redirige a home o donde quieras
//   router.navigate(['/home']);
//   return false;
// };
