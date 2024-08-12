import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Empresa } from '../interfaces/empresa.interface';
import { LoginResponseEmpresa } from '../interfaces/empresa-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private readonly baseUrl: string = 'http://localhost:3000/api/companies';
  private http = inject(HttpClient);

  // Señal para el usuario actual
  private _currentUser = signal<Empresa | null>(null);

  // Computed para obtener el usuario actual desde afuera
  public currentUser = computed(() => this._currentUser());

  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<LoginResponseEmpresa>(url, body).pipe(
      tap(({ empresa, token }) => {
        if (empresa && token) {
          // Guardar usuario y token en el localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('empresa', JSON.stringify(empresa));

          // Actualizar la señal con el usuario logueado
          this._currentUser.set(empresa);
        }
      }),
      map(() => true),
      catchError((err) => {
        const errorMsg = err?.error?.message || 'Error desconocido al iniciar sesión.';
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  register(company: Empresa): Observable<Empresa> {
    const url = `${this.baseUrl}/register`;

    return this.http.post<Empresa>(url, company).pipe(
      tap((newCompany) => {
        this._currentUser.set(newCompany);
      }),
      catchError((err) => {
        const errorMsg = err?.error?.message || 'Error desconocido al registrar la empresa.';
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  loadUserFromLocalStorage() {
    const user = localStorage.getItem('empresa');
    if (user) {
      this._currentUser.set(JSON.parse(user));
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('empresa');
    this._currentUser.set(null);
  }
}
