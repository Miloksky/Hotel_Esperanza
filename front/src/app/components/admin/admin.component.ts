import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
  
})
export class AdminComponent {
  // Aquí se pueden incluir funciones para redireccionar o abrir modales en el futuro

  onManageRooms() {
    alert('Navegar a Crear/Modificar Habitaciones');
    // Aquí puedes usar routing o lógica adicional más adelante
  }

  onManageResources() {
    alert('Navegar a Crear/Modificar Recursos');
  }

  onManageReservations() {
    alert('Navegar a Administración de Reservas');
  }
}
