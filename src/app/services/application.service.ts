import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly baseUrl: string = 'http://localhost:3000/api'; // Cambia esto según tu configuración

  private http = inject(HttpClient);


  applyToJob(idEmpleo: number): Observable<any> {
    const token = localStorage.getItem('token'); // O desde donde guardes el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post(`http://localhost:3000/api/empleos/${idEmpleo}/postularse`, null, { headers });
  }
  
}
