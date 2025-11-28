
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot,CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const logGuard: CanActivateFn =(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const authService = inject(LoginService);
    const router = inject(Router);

    if (true) //UPDATED TO AVOID LOG GUARD FOR NOW
        return true;
    else{
      router.navigate(['no-sesion'])
      setTimeout(() => {
      alert('Debe iniciar sesión para acceder a esta función.')
      router.navigate(['log-in'])
      }, 500);
      return false;
    }
  }



