import { Component, OnInit, inject } from '@angular/core';
import { IRoom } from '../../interfaces/room.interface';
import {ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  imports: [],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {
  rooms: IRoom[] = [];
  checkInDate: string = '';
  checkOutDate: string = '';
  guests: number = 0;
  reservationService = inject(ReservationService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(){
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const roomsData = localStorage.getItem('availableRooms');
    if (roomsData) {
      this.rooms = JSON.parse(roomsData);
    } 
    const reservationInfo = localStorage.getItem('reservationInfo');
    if (reservationInfo) {
      const [checkIn, checkOut, guests] = JSON.parse(reservationInfo);
      this.checkInDate = checkIn;
      this.checkOutDate = checkOut;
      this.guests = guests;
    }
  }
    reserveRoom(roomNumber: string) {
    const reservationData = {
      rooms: [
        {
          number: roomNumber,
          start_date: this.checkInDate,
          end_date: this.checkOutDate
        }
      ]
    };

    this.reservationService.createRoomReservation(reservationData).subscribe({
    next: (response) => {
    if (response.success) {
      console.log(response.msg);
    } else {
      console.error('Error en la respuesta:', response.msg);
    }
  }

    });
  }

  

}
