import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 authService = inject(AuthService);
 router = inject(Router);


  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  goToReservation(){
    const payload = this.authService.getPayload();
    const userId = payload.id;
    if(userId){
      this.router.navigate(['/cliente', userId]);
    } else{
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
  }
}