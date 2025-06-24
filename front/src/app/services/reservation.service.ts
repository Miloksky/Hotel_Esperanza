import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoom } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  httpClient = inject(HttpClient);
  private API_URL = 'http://localhost:3000/';
 
  
  roomsAvailable(data: {start_date: string; end_date : string, guests:number}):Observable<IRoom[]> {
    return this.httpClient.post<IRoom[]>(`${this.API_URL}reservations/checkAvailability`,data);
  }


}
