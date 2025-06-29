import { Component, OnInit, inject } from '@angular/core';
import { IRoom } from '../../interfaces/room.interface';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IResource } from '../../interfaces/resource.interface';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
})
export class ReservationsComponent implements OnInit {
  reservationService = inject(ReservationService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  rooms: IRoom[] = [];
  selectedRoomNumber: string | null = null;
  checkInDate: string = '';
  checkOutDate: string = '';
  guests: number = 0;
  roomResources: { [key: number]: IResource[] } = {};
  selectedResources: { [key: number]: number | null } = {};
  selectedRoom: IRoom[] = [];
  showRoomResources: string | null = null; 

  ngOnInit() {
    const roomsData = localStorage.getItem('availableRooms');

    if (roomsData) {
      this.rooms = JSON.parse(roomsData);
    }
    for (let room of this.rooms) {
      this.loadRoomResources(room.id);
    }
    const reservationInfo = localStorage.getItem('reservationInfo');
    if (reservationInfo) {
      const [checkIn, checkOut, guests] = JSON.parse(reservationInfo);
      this.checkInDate = checkIn;
      this.checkOutDate = checkOut;
      this.guests = guests;
    }
  }

  loadRoomResources(roomId: number) {
    this.reservationService.getRoomResources(roomId).subscribe({
      next: (response) => {
        this.roomResources[roomId] = response.data;
      },
      error: () => {
        this.roomResources[roomId] = [];
      },
    });
  }

  addRoom(room: IRoom) {
  if (!this.selectedRoom.find((r) => r.number === room.number)) {
    this.selectedRoom.push(room);
  }
}

removeRoom(room: IRoom) {
  const index = this.selectedRoom.findIndex((r) => r.number === room.number);
  if (index !== -1) {
    this.selectedRoom.splice(index, 1);
  }
}


  getTotalCapacity(): number {
    let total = 0;
    for (let room of this.selectedRoom) {
      total += room.capacity; 
    }
    return total;
  }

  calculateNights(): number {
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    const nigths = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(nigths / (1000 * 60 * 60 * 24));
  }

  calculateTotal(): number {
    let total = 0;
    const nights = this.calculateNights();

    for (let room of this.selectedRoom) {
      const price = parseFloat(room.price);
      total += price * nights;

      const resourceId = this.selectedResources[room.id];
      const resources = this.roomResources[room.id];

      if (resources && resourceId) {
        const resource = resources.find((r) => r.id === resourceId);
        if (resource) {
          total += resource.price * nights;
        }
      }
    }

    return total;
  }



  confirmReservation() {
  
  if (!this.selectedRoom.length) return;


  if (this.getTotalCapacity() < this.guests) {
    alert('No hay suficientes camas para todos los huéspedes.');
    return;
  }

  const reservationData = {
    rooms: this.selectedRoom.map(room => ({
      number: room.number,
      start_date: this.checkInDate,
      end_date: this.checkOutDate,
      resource_id: this.selectedResources[room.id]
    }))
  };

  console.log(reservationData)

  const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }
  this.reservationService.createRoomReservation(reservationData).subscribe({
    next: (response) => {
      if (response.success) {
        //limpiar selección, redirigir, mostrar mensaje...
        alert('¡Reserva realizada con éxito!');
      } else {
        alert('Error: ' + response.msg);
      }
    },
    error: () => {
      alert("error del servidor");
    }
  });
}

 editReservation() {}
}
