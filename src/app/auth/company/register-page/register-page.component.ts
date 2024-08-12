import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProvinciasService } from '../../../services/provincias.service';
import { EmpresaService } from '../../../services/empresa-service.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  private provincias = inject(ProvinciasService);

  provinciasList: any = [];

  constructor(private fb: FormBuilder, private empresaService: EmpresaService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // Asumiendo un RUC de 11 dígitos
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      province: ['', Validators.required],
    });
    this.obtenerProvincias();
  }
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

  onSubmit() {
    if (this.registerForm.valid) {
      this.empresaService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Empresa registrada:', response);
        },
        error: (error) => {
          console.error('Error registrando empresa:', error);
        },
      });
    }
  }
}
