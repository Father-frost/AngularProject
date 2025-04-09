import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MaterialModule } from '../../../material/material.module';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'page-header',
  imports: [MaterialModule, RouterLink],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  loggedIn: boolean = false;
  name: string = '';

  readonly authService: AuthService = inject(AuthService);
  readonly router: Router = inject(Router);
  
  constructor() {
    this.authService.userStatus.subscribe({
      next: (res) => {
        if (res == 'loggedIn') {
          this.loggedIn = true;
          let user = this.authService.getUserInfo()!;
          this.name = `${user.name}`;
        } else {
          this.loggedIn = false;
          this.name = '';
        }
      },
    });
  }
  
  logout() {
    this.authService.logOut();
  }
}
