import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoom } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.apiUrl}/rooms/show/rooms`);
  }

  getRoomById(id: number): Observable<IRoom> {
    return this.http.get<IRoom>(`${this.apiUrl}/rooms/show/rooms/${id}`);
  }

  createRoom(room: IRoom): Observable<IRoom> {
    RoomId: null;
    return this.http.post<IRoom>(`${this.apiUrl}/rooms/create/rooms`, room);
  }

  updateRoom(id: number, room: IRoom): Observable<IRoom> {
    return this.http.put<IRoom>(`${this.apiUrl}/rooms/update/rooms/${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/rooms/delete/rooms/${id}`);
  }

}
