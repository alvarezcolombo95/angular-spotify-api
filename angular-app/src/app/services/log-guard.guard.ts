
// export const logGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot,CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const logGuard: CanActivateFn =(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const authService = inject(LoginService);
    const router = inject(Router);

    if (authService.checkLog())
        return true;
    else{
      router.navigate(['login']);
      return false;
    }
  }



