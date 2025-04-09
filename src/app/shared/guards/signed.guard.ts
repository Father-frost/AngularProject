import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject, Injectable } from "@angular/core";


 
export const SignedGuard = () => {
    const authService = inject(AuthService);  
    const router = inject(Router);
    console.log(authService.isLoggedIn());
    if (authService.isLoggedIn()){
      router.navigate(['/book-list']);
      return false;
    }
    return true;

};