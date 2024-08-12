import { Component, inject } from '@angular/core';
import { ProvinciasService } from '../../../services/provincias.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private provincias = inject(ProvinciasService);

  provinciasList: any = [];

  constructor() {
    this.obtenerProvincias();
  }

  // Obtener provincias
  obtenerProvincias() {
    this.provincias.obtenerProvincias().subscribe({
      next: (data) => {
        this.provinciasList = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
