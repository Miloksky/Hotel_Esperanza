import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) {}

loginUsuario(form: NgForm) {
  this.auth.login(form.value).subscribe({
    next: () => this.router.navigate(['/admin']),
    error: err => console.error('Login fallido:', err)
  });
}

}
