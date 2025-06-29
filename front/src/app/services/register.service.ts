import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/register.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpClient = inject(HttpClient);
  private API_URL = 'http://localhost:3000/user/register';

  constructor(private http: HttpClient) { }
  registerUser(user: IUser): Observable<any> {
    return this.http.post<any>(this.API_URL, user);
  }
}
