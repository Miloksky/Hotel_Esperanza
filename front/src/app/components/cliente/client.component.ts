import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  private fb = inject(FormBuilder);

  // Datos de ejemplo de una reserva
  reserva = {
    hotelName: 'Hotel Esperanza',
    checkIn: new Date('2025-07-01'),
    checkOut: new Date('2025-07-07'),
    guests: 2,
    tipoReserva: 'Habitación doble'
  };

  // Formulario para la valoración
  reviewForm: FormGroup = this.fb.group({
    rating: [0, Validators.required],
    comment: ['', Validators.required]
  });

  stars = [1, 2, 3, 4, 5];

  setRating(star: number) {
    this.reviewForm.controls['rating'].setValue(star);
  }

  submitReview() {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }
    console.log('Review enviada:', this.reviewForm.value);
    alert('Gracias por tu valoración');
    this.reviewForm.reset({ rating: 0, comment: '' });
  }
}
