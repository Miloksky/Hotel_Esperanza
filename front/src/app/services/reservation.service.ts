import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
 httpClient = inject(HttpClient);
  private API_URL = 'http://localhost:3000';
}
