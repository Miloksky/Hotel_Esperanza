import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData, TokenResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user/login'; // Cambia esto si tu endpoint es diferente

  http = inject(HttpClient);

  login(credentials: LoginData): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.apiUrl, credentials);
  }
}
