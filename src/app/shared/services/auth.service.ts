import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject, map, timer } from 'rxjs';
import { User } from '../../models/models';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiBaseUrl;//'http://localhost:3000/';
  userStatus: Subject<string> = new Subject();

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private jwt: JwtHelperService, private router: Router) {}

  register(user: any) {
    return this.http.post(this.baseUrl + 'Register', user, {
      responseType: 'text',
    });
  }

  login(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

// console.log(this.http.get(this.baseUrl + 'user', {
//   params: params,
//   responseType: 'text',
// }));

    return this.http.get(this.baseUrl + 'user', {
      params: params,
      responseType: 'text',
    });

  }

  isLoggedIn(): boolean {
//console.log(localStorage.getItem('access_token'));
    if (
    
      localStorage.getItem('access_token') != null &&
      !this.jwt.isTokenExpired()
    )
    
      return true;
    return false;
  }

  getUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    var decodedToken = this.jwt.decodeToken();
    var user: User = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      password: '',
    };
    return user;
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.userStatus.next('loggedOff');  
    location.reload();
  }


  getUsers() {
    return this.http.get<User[]>(this.baseUrl + 'GetUsers');
  }

  updateIsAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
