import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/user/login', credentials); //ruta correcta de incio sesion
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
   getPayload(): any {
    const token = this.getToken();
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  getAuthHeaders(): { Authorization: string } {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}` 
    };
  }

  isLoggedIn(): boolean {
    const token = this.getToken(); //compro log
    return token !== null;
  }

  logout(): void {
    localStorage.removeItem('token'); //cerrar sesion para implementarlo en el nav bar
  }
}
