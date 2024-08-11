import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly baseUrl: string = 'http://localhost:3000/api/empleos';

  private http = inject(HttpClient)

  constructor( ) { }

  obtenerEmpleos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

}
