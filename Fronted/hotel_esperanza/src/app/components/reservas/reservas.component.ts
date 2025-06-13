import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reservas',
  imports: [FormsModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

constructor(private api: ApiService) {}

reserva = {
  user_id: 0,
  habitacion_id: 0,
  fecha_inicio: '',
  fecha_fin: ''
};

reservar() {
  this.api.postReserva(this.reserva).subscribe({
    next: () => alert('¡Reserva exitosa!'),
    error: () => alert('Error al reservar.')
  });
}


}
