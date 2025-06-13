import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getHabitaciones(): Observable<any> {
    return this.http.get(`${this.URL}/habitaciones`);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.URL}/users`);
  }

  getReservas() {
  return this.http.get<any[]>('http://localhost:3000/api/reservas');
  }


  postReserva(data: any) {
    return this.http.post('http://localhost:3000/api/reservas', data);
  }

  login(data: any) {
  return this.http.post(`${this.URL}/auth/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.URL}/auth/register`, data);
  }

}
