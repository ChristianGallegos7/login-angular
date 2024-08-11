import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  // Señal para el usuario actual
  private _currentUser = signal<User | null>(null);

  // Computed para obtener el usuario actual desde afuera
  public currentUser = computed(() => this._currentUser());

  constructor() { }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        if (user && token) {
          // Guardar usuario y token en el localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          // Actualizar la señal con el usuario logueado
          this._currentUser.set(user);
        }
      }),
      map(() => true),
      catchError(err => {
        const errorMsg = err?.error?.message || 'Error desconocido al iniciar sesión.';
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  // Método para obtener el usuario actual almacenado en el localStorage
  loadUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this._currentUser.set(JSON.parse(user));
    }
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser.set(null);
  }
}
