import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    FormsModule
    
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

constructor(private api: ApiService) {}


reservas: any[] = [];
habitaciones: any[] = [];
username: string = '';


ngOnInit() {
  this.api.getReservas().subscribe(res => this.reservas = res);
  this.api.getHabitaciones().subscribe(hab => this.habitaciones = hab);
}
}
