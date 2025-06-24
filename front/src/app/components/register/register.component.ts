import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { IUser } from '../../interfaces/register.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  formError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }


     ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''], 
      document: [''] 
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.formError = null;
    });
  } 

  

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.formError = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.registerForm.value;
    const newUser: IUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || null,
      document: formData.document || null
    };
    this.registerService.registerUser(newUser).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        alert('¡Registro exitoso! ' + (response.msg || ''));
        this.registerForm.reset();
        this.router.navigate(['/reservation']);
      },
      error => {
        console.error('Error en el registro:', error);
        console.error('Error en el registro:', error);
        if (error.error && error.error.msg) {
          this.formError = 'Error en el registro: ' + error.error.msg;
        } else if (error.message) {
          this.formError = 'Error en el registro: ' + error.message;
        } else {
          this.formError = 'Error en el registro: Inténtalo de nuevo.';
        }
        this.f['email'].setErrors(null);
      }
    );
  }


}
