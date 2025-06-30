import { Component, OnInit } from '@angular/core';
import { IRoom } from '../../../interfaces/room.interface';
import { RoomService } from '../../../services/room.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-list',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit{

  rooms: IRoom[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  constructor(private roomService: RoomService, private router: Router) { }
  ngOnInit(): void {
    this.loadRooms();
  }
  loadRooms(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar las habitaciones:', err);
        this.errorMessage = 'No se pudieron cargar las habitaciones. Inténtalo de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }
  editRoom(roomId:number): void {
    if (roomId) {
      this.router.navigate(['/admin/room-management', roomId]);
    }
  }
  deleteRoom(roomId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
      if (roomId) {
        this.roomService.deleteRoom(roomId.toString()).subscribe({
          next: () => {
            console.log('Habitación eliminada exitosamente');
            this.loadRooms();
          },
          error: (err) => {
            console.error('Error al eliminar la habitación:', err);
            this.errorMessage = 'No se pudo eliminar la habitación.';
          }
        });
      }
    }
  }
  createNewRoom(): void {
    this.router.navigate(['/admin/room-management']);
  }

}
