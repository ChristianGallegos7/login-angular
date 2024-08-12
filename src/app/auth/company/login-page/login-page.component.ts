import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
//Injeccion de servicios
private fb = inject(FormBuilder);
private authService = inject(AuthService);
private router = inject(Router);


public loginForm: FormGroup = this.fb.group({
  email: ['christiandc757@gmail.com', [Validators.required, Validators.email]],
  password: ['1234567', [Validators.required, Validators.minLength(6)]]
});

login() {
  if (this.loginForm.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Formulario inválido',
      text: 'Por favor, completa todos los campos correctamente.',
    });
    return;
  }

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe({
    next: () => this.router.navigateByUrl('/dashboard'),
    error: (err: Error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error en el login',
        text: err.message,
      });
    }
  });
}
}
