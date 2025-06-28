// codigo antes de reservationinfo(variable en la que se pasa la informacion de la reserva mediante
// local storage)
// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   fb = inject(FormBuilder);
//   authService = inject(AuthService);
//   router = inject(Router);
//   errorMessage = '';

//   loginForm: FormGroup = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });

//   onSubmit(): void {
//     console.log('Formulario enviado');

//     if (this.loginForm.invalid) {
//       this.loginForm.markAllAsTouched();
//       this.errorMessage = 'Por favor completa todos los campos.';
//       return;
//     }

//     const { email, password } = this.loginForm.value;

//     this.authService.login({ email, password }).subscribe({
//       next: (response: any) => {  
//         console.log('Login exitoso', response);
//         localStorage.setItem('token', response.token);
//         this.router.navigate(['/home']);
//       },
//       error: (error: any) => {
//         console.error('Error al iniciar sesión', error);
//         this.errorMessage = 'Credenciales incorrectas o error en el servidor.';
//       }
//     });
//   }
// }
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    console.log('Formulario enviado');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response: any) => {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.token);

        // Redirección basada en reservationInfo
        const hasReservationInfo = localStorage.getItem('reservationInfo');
        if (hasReservationInfo) {
          this.router.navigate(['/reservations']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error: any) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Credenciales incorrectas o error en el servidor.';
      }
    });
  }
}
