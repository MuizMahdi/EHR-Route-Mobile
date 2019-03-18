import { AuthService } from './../Services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
   providedIn:'root'
})


export class AuthGuard implements CanActivate
{
   constructor(private router:Router, private authService:AuthService)
   { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
   {
      return false;
   }
}