import { Component, OnInit, inject } from '@angular/core';
import { IRoom } from '../../interfaces/room.interface';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IResource } from '../../interfaces/resource.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [FormsModule],
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
  guests: number = 1;
  roomResources: { [key: number]: IResource[] } = {};
  selectedResources: { [key: number]: number | null } = {};
  selectedRoom: IRoom[] = [];
  showRoomResources: string | null = null;
  editDates: boolean = false;
  today = new Date().toISOString().slice(0, 10);
  editDatesError: string = '';
  EditMode: boolean = false;

  

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

    const pending = localStorage.getItem('pendingReservation');
    if (pending) {
      const data = JSON.parse(pending);
      console.log('Restaurando reserva:', data);
      this.selectedRoom = data.selectedRoom;
      this.selectedResources = data.selectedResources;
      this.checkInDate = data.checkInDate;
      this.checkOutDate = data.checkOutDate;
      this.guests = Number(data.guests);

     
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
    console.log(
      'CheckIn:',
      this.checkInDate,
      'CheckOut:',
      this.checkOutDate,
      'Rooms:',
      this.selectedRoom,
      'Resources:',
      this.selectedResources
    );
    const reservationData = {
       guests: this.guests,
      rooms: this.selectedRoom.map((room) => ({
        number: room.number,
        start_date: this.checkInDate,
        end_date: this.checkOutDate,
        resource_id: this.selectedResources[room.id],
      })),
    };


    const token = localStorage.getItem('token');
    if (!token) {
      const pendingReservation = {
        selectedRoom: this.selectedRoom,
        selectedResources: this.selectedResources,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        guests: this.guests,
      };
      localStorage.setItem(
        'pendingReservation',
        JSON.stringify(pendingReservation)
      );
      this.router.navigate(['/login']);
      return;
    }
    this.reservationService.createRoomReservation(reservationData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('¡Reserva realizada con éxito!');
          localStorage.removeItem('pendingReservation');
          localStorage.removeItem('availableRooms');
          localStorage.removeItem('reservationInfo');
          this.router.navigate(['/cliente']);
        } else {
          alert('Error: ' + response.msg);
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        alert('error del servidor');
      },
    });
  }

 minCheckOutDate(): string {
  if (this.checkInDate) {
    const date = new Date(this.checkInDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }
  return this.today;
}

 saveDates() {
  // Guardar fechas y huéspedes actualizados
  this.editDatesError = '';
  if (!this.checkInDate || !this.checkOutDate || !this.guests) {
     this.editDatesError = 'Por favor, rellena todos los campos antes de guardar.';
    return;
  }
  if (this.checkInDate < this.today) {
    this.editDatesError = 'La fecha de entrada no puede ser anterior a hoy.';
    return;
  }

  if (this.checkInDate >= this.checkOutDate) {
   this.editDatesError = 'La fecha de salida debe ser posterior a la de entrada.';
    return;
  }
  localStorage.setItem('reservationInfo', JSON.stringify([this.checkInDate, this.checkOutDate, this.guests]));
  // Consultar al backend habitaciones disponibles con las nuevas fechas
  this.reservationService.roomsAvailable({
    start_date: this.checkInDate,
    end_date: this.checkOutDate,
    guests: this.guests,
  }).subscribe({
    next: (rooms) => {
      this.rooms = rooms;
      localStorage.setItem('availableRooms', JSON.stringify(rooms));
      this.selectedRoom = [];
      this.selectedResources = {};
      this.editDates = false;
      for (let room of this.rooms) {
        this.loadRoomResources(room.id);
      }
    },
    error: () => {
      this.rooms = [];
      alert('Hubo un problema al consultar la disponibilidad.');
    }
  });
}
}
