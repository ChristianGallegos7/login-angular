import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  private currentUser = inject(AuthService);

  public user:any;

  loadUserFromLocalStorage(){
    return this.user = this.currentUser.loadUserFromLocalStorage()
  }
}
