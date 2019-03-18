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
      // Get the JWT stored on LocalStorage
      const accessToken = this.authService.getAccessToken();

      if (accessToken) {
         // Return true if user has authenticated
         return true;
      }

      // Navigate user to login page if not
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

      return false;
   }

}
