import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  private fb = inject(FormBuilder);
  private reservationService = inject(ReservationService);

  reserva: any;

  // Formulario para la valoración
  reviewForm: FormGroup = this.fb.group({
    rating: [0, Validators.required],
    comment: ['', Validators.required]
  });

  stars = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.reservationService.getReserva().subscribe((reserva) => {
      this.reserva = {
        hotelName: 'Hotel Esperanza',
        checkIn: new Date(reserva.start_date),
        checkOut: new Date(reserva.end_date),
        tipoReserva: 'Habitación doble'
      };
    });
  }

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
