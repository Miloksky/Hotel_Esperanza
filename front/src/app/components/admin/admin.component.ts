import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
  
})
export class AdminComponent {
  
  constructor(private router: Router) { }

  onManageRooms() {
    this.router.navigate(['/admin/rooms-list']);
  }

  onManageResources() {
    alert('Navegar a Crear/Modificar Recursos');
  }

  onManageReservations() {
    alert('Navegar a Administración de Reservas');
  }
}
