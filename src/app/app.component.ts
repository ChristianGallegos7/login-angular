import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './auth/user/login-page/login-page.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // animations: [
  //   trigger('fadeAnimation', [
  //     transition('* <=> *', [
  //       style({ opacity: 0 }),
  //       animate('300ms', style({ opacity: 1 })),
  //     ]),
  //   ])
  // ]
})
export class AppComponent {
  title = 'login';
}
