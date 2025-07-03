import { AuthService } from './../../services/auth.service';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit{
  private fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  userId: number = 0;
  authService = inject(AuthService);
  errorMsg = '';
  router= inject(Router);
  clientInfo:any = null;


  ngOnInit():void{
    this.activatedRoute.params.subscribe(params => {
    this.userId= Number(params['id']);
    const tokenInfo = this.authService.getPayload();
    if(Number(tokenInfo.id) !== this.userId){
      alert('No tienes permiso para ver esta página.');
      this.router.navigate(['/login']);
    return;
    }
});


  }

  // Datos de ejemplo de una reserva
  reserva = {
    hotelName: 'Hotel Esperanza',
    checkIn: new Date('2025-07-01'),
    checkOut: new Date('2025-07-07'),
    tipoReserva: 'Habitación doble'
  };

  // Formulario para la valoración
  reviewForm: FormGroup = this.fb.group({
    rating: [0, Validators.required],
    comment: ['', Validators.required]
  });

  stars = [1, 2, 3, 4, 5];

  setRating(star: number) {
    this.reviewForm.controls['rating'].setValue(star);
  }

  submitReview() {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }
    console.log('Review enviada:', this.reviewForm.value);
    alert('Gracias por tu valoración');
    this.reviewForm.reset({ rating: 0, comment: '' });
  }
}
