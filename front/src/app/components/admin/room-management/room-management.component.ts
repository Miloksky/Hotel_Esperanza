import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoom } from '../../../interfaces/room.interface';
import { of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-management',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.scss'
})
export class RoomManagementComponent implements OnInit{
  roomForm: FormGroup;
  isEditMode: boolean = false;
  roomId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      number: [null, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      available: [true]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.roomId = params.get('id');
        if (this.roomId) {
          this.isEditMode = true;
          return this.roomService.getRoomById(this.roomId);
        } else {
          this.isEditMode = false;
          return of(null);
        }
      })
    ).subscribe(room => {
      if (this.isEditMode && room) {
        this.roomForm.patchValue(room);
      }
    });
  }
  onSubmit(): void {
    console.log('onSubmit() se ha ejecutado');
    if (this.roomForm.valid) {
      console.log('Formulario válido. roomData:', this.roomForm.value);
      const roomData: IRoom = this.roomForm.value;
      if (this.isEditMode && this.roomId) {
        this.roomService.updateRoom(this.roomId, roomData).subscribe({
          next: () => {
            console.log('¡Habitación actualizada exitosamente!');
            this.router.navigate(['/admin/rooms-list']);
          },
          error: (err) => {
            console.error('Error al actualizar la habitación:', err);
          }
        });
      } else {
        this.roomService.createRoom(roomData).subscribe({
          next: () => {
            console.log('¡Habitación creada exitosamente!');
            this.router.navigate(['/admin/rooms-list']);
          },
          error: (err) => {
            console.error('Error al crear la habitación:', err);
          }
        });
      }
    }
  }
  
  onCancel(): void {
    this.router.navigate(['/admin/rooms-list']);
  }


}
