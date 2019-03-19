import { AuthService } from './../../../Services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})


export class SettingsPage
{
   constructor(private authService:AuthService, private router:Router) 
   { }
   

   onLogout()
   {
      this.authService.logout();
      this.router.navigate(['login']);
   }
}
