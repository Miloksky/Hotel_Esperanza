import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoom } from '../interfaces/room.interface';
import { IReservationResponse } from '../interfaces/reservation-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private API_URL = 'http://localhost:3000/';
 
  
  roomsAvailable(data: {start_date: string; end_date : string, guests:number}):Observable<IRoom[]> {
    return this.httpClient.post<IRoom[]>(`${this.API_URL}reservations/checkAvailability`,data);
  }

    createRoomReservation(reservationData: any): Observable<IReservationResponse> {
    const headers = this.authService.getAuthHeaders();

    return this.httpClient.post<IReservationResponse>(
      `${this.API_URL}reservations/create`,reservationData,{ headers }
    );
  }
}
