import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  myform = inject(FormBuilder);
  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  availabilityMessage: string = '';
  today = new Date().toISOString().substring(0, 10);

  dateForm: FormGroup = this.myform.group({
    checkIn: new FormControl<string>('', Validators.required),
    checkOut: new FormControl<string>('', Validators.required),
    guest: new FormControl<number> (1, Validators.required)
  });

  checkAvailability() {
   if(this.dateForm.invalid){
    this.dateForm.markAllAsTouched();
    this.availabilityMessage = 'Es necesario completar todos los campos';
    return
   }
       const { checkIn, checkOut, guests } = this.dateForm.value;

    if (checkIn < this.today) {
      this.availabilityMessage = '❌ La fecha de entrada no puede ser anterior a hoy.';
      return;
    }

    if (checkIn >= checkOut) {
      this.availabilityMessage = '❌ La fecha de salida debe ser posterior a la de entrada.';
      return;
    }
   this.availabilityMessage = 'Hay disponibilidad';

  }
}
