import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  selectedDate: string = '';
  selectedGuests: number = 1;
  availabilityMessage: string = '';

  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  checkAvailability() {
    if (this.selectedDate && this.selectedGuests) {
      this.availabilityMessage = `✅ Disponibilidad para el ${this.selectedDate} con ${this.selectedGuests} persona(s).`;
    } else {
      this.availabilityMessage = '❗ Por favor, completa todos los campos.';
    }
  }
}
