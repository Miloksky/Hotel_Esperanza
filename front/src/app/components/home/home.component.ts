import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from './../../services/reservation.service';
import { IRoom } from '../../interfaces/room.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  reservationService=inject(ReservationService);
  myform = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  availabilityMessage: string = '';
  today = new Date().toISOString().substring(0, 10);
  rooms: IRoom[] = [];

  dateForm: FormGroup = this.myform.group({
    checkIn: new FormControl<string>('', Validators.required),
    checkOut: new FormControl<string>('', Validators.required),
    guests: new FormControl<number>(1, Validators.required),
  });

  getMinCheckOutDate(): string {
    const checkInDate = this.dateForm.get('checkIn')?.value;
   return checkInDate || this.today;
  }

  checkAvailability() {
    if (this.dateForm.invalid) {
      this.dateForm.markAllAsTouched();
      this.availabilityMessage = 'Es necesario completar todos los campos';
      return;
    }
    const { checkIn, checkOut, guests } = this.dateForm.value;
    localStorage.setItem('reservationInfo', JSON.stringify([checkIn, checkOut, guests]));

    if (checkIn < this.today) {
      this.availabilityMessage =
        'La fecha de entrada no puede ser anterior a hoy.';
      return;
    }

    if (checkIn >= checkOut) {
      this.availabilityMessage =
        'La fecha de salida debe ser posterior a la de entrada.';
      return;
    }
  this.reservationService.roomsAvailable({
      start_date: checkIn,
      end_date: checkOut,
      guests: guests ?? 1,
    }).subscribe({
      next: (rooms) => {
        console.log(rooms)
        this.rooms = rooms;
        if (rooms.length === 0) {
          this.availabilityMessage = 'No hay habitaciones disponibles para estas fechas';
        }else {
          localStorage.setItem('availableRooms', JSON.stringify(rooms));
          this.router.navigate(['/reservations']);
        }
      },
      error: (err) => {
        this.rooms = [];
        this.availabilityMessage = 'Hubo un problema al consultar la disponibilidad.';
        console.log(err);
      }
    });
  }
}

