import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  successMessage: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

     ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['', Validators.required], 
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.passwordStrengthValidator
    ]],
         phone: ['', [
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(9),
        Validators.maxLength(9) 
      ]], 
        document: ['', this.nifNieValidator] 
    });

    this.registerForm.get('document')?.valueChanges.subscribe(value => {
      if (value && value !== value.toUpperCase()) {
        this.registerForm.get('document')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.formError = null;
      this.successMessage = null;
    });
  }

private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const hasUpper = /[A-Z]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return hasUpper && hasSymbol ? null : { passwordStrength: true };
}

private nifNieValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = (control.value || '').toUpperCase().trim();
  if (!value) return null;

  const nifRegex = /^[0-9]{8}[A-Z]$/;
  const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;

  const valid = nifRegex.test(value) || nieRegex.test(value);
  return valid ? null : { invalidNifNie: true };
}

private phoneValidator = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value || '';
  if (!value) {
    return null;
  }
  const numericRegex = /^[0-9]{9}$/;
  if (!numericRegex.test(value)) {
    return { invalidPhone: true };
  }
  return null;
}

togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.formError = null;
    this.successMessage = null;

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
        this.successMessage = '¡Registro exitoso! Redirigiendo...';
        console.log('successMessage establecido a:', this.successMessage);
        setTimeout(() => {
          console.log('Iniciando redirección...');
          this.router.navigate(['/home']);
        }, 3000);
      },
      error => {
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
