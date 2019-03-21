import { Toast } from '@ionic-native/toast/ngx';
import { AuthService } from './../../../Services/auth.service';
import { first } from 'rxjs/operators';
import { UserRegistrationRequest } from './../../../Models/Payload/Requests/UserRegistrationRequest';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit 
{
   registrationFormGroup:FormGroup;

   registrationName:string;
   registrationEmail:string;
   registrationUsername:string;
   registrationPassword:string;
   registrationPasswordConfirm:string;


   constructor(private authService:AuthService, private router:Router, private toast:Toast) 
   { }


   ngOnInit() 
   {
      this.buildForm();
   }


   buildForm(): void
   {
      this.registrationFormGroup = new FormGroup({
         nameCtrl: new FormControl(null, [Validators.required]),
         usernameCtrl: new FormControl(null, [Validators.required]),
         emailCtrl: new FormControl(null, [Validators.required]),
         passwordCtrl: new FormControl(null, [Validators.required]),
         passwordConfirmCtrl: new FormControl(null, [Validators.required])
      });
   }


   toLogin(): void
   {
      this.router.navigate(['/login']);
   }


   onRegistration()
   {
      // Form values
      this.registrationName = this.registrationFormGroup.get("nameCtrl").value;
      this.registrationUsername = this.registrationFormGroup.get("usernameCtrl").value;
      this.registrationEmail = this.registrationFormGroup.get("emailCtrl").value;
      this.registrationPassword = this.registrationFormGroup.get("passwordCtrl").value;
      this.registrationPasswordConfirm = this.registrationFormGroup.get("passwordConfirmCtrl").value;

      // Construct a registration request object using form values
      let userRegistrationRequest:UserRegistrationRequest = {
         name: this.registrationName,
         username: this.registrationUsername,
         email: this.registrationEmail,
         password: this.registrationPassword
      }

      // Send the registration request
      this.authService.register(userRegistrationRequest).pipe(first()).subscribe(
         
         response => {
            // Show a notification
            this.toast.show(
               'A confirmation message has been sent to your email',
               '3000',
               'bottom'
            ).subscribe();

            // Route to the login page
            this.toLogin();
         }

      );
   }
}
