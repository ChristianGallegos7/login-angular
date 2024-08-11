import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que este servicio exista y maneje la autenticación

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
