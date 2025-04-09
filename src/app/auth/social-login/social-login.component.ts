import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  standalone:true,
  imports:[
    CommonModule,
    GoogleSigninButtonModule
  ],
  templateUrl: './social-login.component.html',
  styleUrl: './social-login.component.css'
})
export class SocialLoginComponent implements OnInit{
  constructor( 
    private socialService:SocialAuthService,
    private authService:AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.socialService.authState.subscribe((user) => {
      //perform further logics
      localStorage.setItem('access_token', user.idToken);
      this.authService.userStatus.next("loggedIn");
      this.router.navigate(['book-list']);
    });
  }
}