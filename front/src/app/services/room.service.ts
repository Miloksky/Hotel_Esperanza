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

  getRoomById(id: string): Observable<IRoom> {
    return this.http.get<IRoom>(`${this.apiUrl}/rooms/show/rooms/${id}`);
  }

  createRoom(room: IRoom): Observable<IRoom> {
    return this.http.post<IRoom>(`${this.apiUrl}/rooms/create/rooms`, room);
  }

  updateRoom(id: string, room: IRoom): Observable<IRoom> {
    return this.http.put<IRoom>(`${this.apiUrl}/rooms/update/rooms/${id}`, room);
  }

  deleteRoom(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/rooms/delete/rooms/${id}`);
  }

  getRoomResources(roomId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rooms/getRoomsResources/rooms/${roomId}/resources`);
  }

  assignResourcesToRoom(roomId: string, resourceIds: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rooms/addResourcesToRooms/rooms/${roomId}/resources`, { resourceIds });
  }
}
