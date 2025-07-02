import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Reserva {
  start_date: string;
  end_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  httpClient = inject(HttpClient);
  private API_URL = 'http://localhost:3000';

  getReserva(id: number = 1): Observable<Reserva> {
    return this.httpClient.get<Reserva>(`${this.API_URL}/reservations/list/${id}`);
  }
}
