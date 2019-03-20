import { UserInfo } from './../../../Models/Payload/Responses/UserInfo';
import { first } from 'rxjs/operators';
import { AuthService } from './../../../Services/auth.service';
import { UserLoginRequest } from './../../../Models/Payload/Requests/UserLoginRequest';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit 
{
   loginFormGroup: FormGroup;

   loginUsernameOrEmail: string;
   loginPassword: string;


   constructor(private router:Router, private authService:AuthService) 
   { }


   ngOnInit() 
   { 
      this.buildForm();
   }


   toRegistration(): void
   {
      this.router.navigate(['/register']);
   }


   private buildForm(): void
   {
      this.loginFormGroup = new FormGroup({
         usernameOrEmailCtrl: new FormControl(null, [Validators.required]),
         passwordCtrl: new FormControl(null, Validators.required)
      });
   }


   onLogin()
   {
      // LoginFormGroup values
      this.loginUsernameOrEmail = this.loginFormGroup.get("usernameOrEmailCtrl").value;
      this.loginPassword = this.loginFormGroup.get("passwordCtrl").value;

      // Construct a UserLoginRequest using form values
      const userInfo: UserLoginRequest = {
         usernameOrEmail: this.loginUsernameOrEmail,
         password: this.loginPassword
      };

      // Send a login request
      this.authService.login(userInfo).pipe(first()).subscribe(

         response => {

            // Navigate to the main page (Tabs-Layout)
            this.router.navigate(['']);

            // Check if its the user's first login
            this.checkIfFirstLogin();

         }
      );
   }


   checkIfFirstLogin()
   {
      // When user info is received from server
      this.authService.currentUser.subscribe((userInfo:UserInfo) => {
         
         // If user is logged in
         if (userInfo) 
         {
            // check if its the user's first time login
            if (userInfo.firstLogin) {
               // Generate an address for the user
               this.generateUserAddress(userInfo);
            } 
         }

      });
   }


   generateUserAddress(userInfo:UserInfo)
   {
      console.log("Generating user's address");
   }
}
