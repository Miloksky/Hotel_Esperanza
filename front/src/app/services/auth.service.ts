import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthHeaders(): { Authorization: string } {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}`
    };
  }

}
