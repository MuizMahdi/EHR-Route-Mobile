import { UserInfo } from './../Models/Payload/Responses/UserInfo';
import { AuthService } from './../Services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
   providedIn:'root'
})


export class InfoCompletionGuard implements CanActivate
{
   constructor(private router:Router, private authService:AuthService)
   { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
   {
      // Get current user info object
      let userInfo:UserInfo = this.authService.getCurrentUser();

      // Check if user didn't complete their information
      if (userInfo && !(userInfo.hasAddedInfo)) {
         return true;
      }

      // Navigate to the tabs if they already added their info
      this.router.navigate([''], { queryParams: { returnUrl: state.url } });

      // YOU SHALL NOT PASS, user.
      return false;
   }
}