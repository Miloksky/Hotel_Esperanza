import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { IRoom } from '../../interfaces/room.interface';
import { FormsModule } from '@angular/forms';
import { IResource } from '../../interfaces/resource.interface';

@Component({
  selector: 'app-reservations-edit',
  imports: [FormsModule],
  templateUrl: './reservations-edit.component.html',
  styleUrl: './reservations-edit.component.scss'
})
export class ReservationsEditComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  reservationService = inject(ReservationService);
  rooms: IRoom[] = [];

  selectedRoom: IRoom[] = [];
  guests: number = 1;
  checkInDate: string = '';
  checkOutDate: string = '';


  editDatesError: string = '';
  erroMsg: string ='';
  today = new Date().toISOString().slice(0, 10);

  editMode: boolean = false;
  editCheckInDate: string = '';
  editCheckOutDate: string = '';
  editGuests: number = 1;
  roomsAvailable: IRoom[] = [];
  editRooms: IRoom[] = [];
  editSelectedResources: { [key: number]: number | null } = {};
  roomResources: { [key: number]: IResource[] } = {};
  showRoomResources: string | null = null;
  reservationId: number = 0;




  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.reservationId = Number(params['id']);
      if (this.reservationId) {
        const token = localStorage.getItem('token');
        if (!token) {
          this.router.navigate(['/login']);
          return;
        }
        this.loadClientReservation(this.reservationId);
      }
    });
  }



  loadClientReservation(id: number) {
    this.reservationService.getReservationById(id).subscribe({
      next: (response) => {
        if (response && response.data) {
          const res = response.data;
          this.selectedRoom = res.rooms || [];
          this.checkInDate = res.checkInDate.substring(0, 10);
          this.checkOutDate = res.checkOutDate.substring(0, 10);
          this.guests = res.guests;
          console.log(this.guests, this.checkInDate, this.selectedRoom);
        }
      },
      error: () => {
        alert('No se pudo cargar la reserva del cliente.');
      }
    });
  }



  startEditMode() {
    this.editMode = true;
    this.editCheckInDate = this.checkInDate;
    this.editCheckOutDate = this.checkOutDate;
    this.editGuests = this.guests;
    this.editRooms = [...this.selectedRoom];
    for (let room of this.editRooms) {
      this.editSelectedResources[room.id] = Number(room.resource_id) || null;
      this.loadRoomResources(room.id);
    }
    this.roomsAvailable = [];
  }



 cancelEdition(id: number) {
    this.editMode = false;
    this.loadClientReservation(id);
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
    const noRoom = this.editRooms.find((r) => r.number === room.number);
    if (!noRoom) {
      this.editRooms.push(room);
    }
  }



  removeRoom(room: IRoom) {
    const index = this.editRooms.findIndex((r) => r.number === room.number);
    if (index !== -1) {
      this.editRooms.splice(index, 1);
    }
  }


  findRooms() {
        this.editDatesError = '';
    if (!this.editCheckInDate || !this.editCheckOutDate || !this.guests) {
      this.erroMsg = 'Por favor, rellena todos los campos antes de guardar.';
      return;
    }
    if (this.editCheckInDate < this.today) {
      this.erroMsg = 'La fecha de entrada no puede ser anterior a hoy.';
      return;
    }

    if (this.editCheckInDate >= this.editCheckOutDate) {
      this.erroMsg = 'La fecha de salida debe ser posterior a la de entrada.';
      return;
    }
    this.reservationService.roomsAvailable({
      start_date: this.editCheckInDate,
      end_date: this.editCheckOutDate,
      guests: this.editGuests,
    }).subscribe({
      next: (rooms) => {
        this.roomsAvailable = rooms;
        for (const room of this.roomsAvailable) {
        this.loadRoomResources(room.id);}
        if(this.roomsAvailable.length <= 0){
          this.erroMsg ='no hay habitacones disponibles'
        }
      },
      error: () => {
        this.roomsAvailable = [];
        this.erroMsg='Hubo un problema al buscar habitaciones.';
      }
    });
  }
getTotalCapacity(): number {
    let total = 0;
    for (let room of this.editRooms) {
      total += room.capacity;
    }
    return total;
  }

  saveChanges(){
     if (!this.editRooms.length) return;

    if (this.getTotalCapacity() < this.guests) {
      alert('No hay suficientes camas para todos los huéspedes.');
      return;
    }
    const reservationData = {
    guests: this.editGuests,
    rooms: this.editRooms.map(room => ({
      id: room.id,
      number: room.number,
      start_date: this.editCheckInDate,
      end_date: this.editCheckOutDate,
      resource_id: this.editSelectedResources[room.id],
    })),
  };

    this.reservationService.editReservation(this.reservationId, reservationData).subscribe({
    next: (response) => {
      if (response && response.success) {
        alert('¡Reserva editada con éxito!');
        this.selectedRoom = [...this.editRooms];
        this.checkInDate = this.editCheckInDate;
        this.checkOutDate = this.editCheckOutDate;
        this.guests = this.editGuests;
        this.editMode = false;
        this.roomsAvailable = [];
        this.editRooms = [];
        this.editSelectedResources = {};
      } else {
        alert('Error: ' + (response.msg ));
      }
    },
    error: () => {
      alert('Error del servidor al editar la reserva.');
    }
  });
}


  totalOfReservation(): number {
    let total = 0;
    for (let i = 0; i < this.selectedRoom.length; i++) {
      // Asegura que subtotal sea número (puede llegar como string)
      const subtotal = Number(this.selectedRoom[i].subtotal) || 0;
      total += subtotal;
    }
    return total;
  }



  minCheckOutDate(): string {
    if (this.editCheckInDate) {
      const date = new Date(this.editCheckInDate);
      date.setDate(date.getDate() + 1);
      return date.toISOString().slice(0, 10);
    }
    return this.today;
  }

}
