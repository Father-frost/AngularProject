import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookCardComponent } from './shared/components/book-card/book-card.component';
import { PageHeaderComponent } from "./shared/components/page-header/page-header.component";
import { PageFooterComponent } from "./shared/components/page-footer/page-footer.component";
import { PageToolboxComponent } from './shared/components/page-toolbox/page-toolbox.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { DataService } from './shared/services/data.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterOutlet, LoginComponent, BookListComponent, BookCardComponent, PageHeaderComponent, PageFooterComponent,PageToolboxComponent],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Book Haven';
  loggedIn: boolean = false;

  readonly dataService: DataService = inject(DataService);
  readonly authService: AuthService = inject(AuthService);
  ngOnInit(): void {
    let status = this.authService.isLoggedIn() ? 'loggedIn' : 'loggedOff';
    //this.loggedIn = this.authService.isLoggedIn() ? true : false;
    console.log(status);
    this.authService.userStatus.next(status);
  }
}
