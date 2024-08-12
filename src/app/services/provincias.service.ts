import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
  private readonly baseUrl: string = 'http://localhost:3000/api/provincias';

  
  private http = inject(HttpClient)

  constructor( ) { }

  obtenerProvincias(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
