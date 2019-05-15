import { ApplicationService } from './../../../Services/application.service';
import { Notification } from './../../../Models/Payload/Responses/Notification';
import { NotificationService } from './../../../Services/notification.service';
import { Toast } from '@ionic-native/toast/ngx';
import { ErrorResponse } from './../../../Models/Payload/Responses/ErrorResponse';
import { AddressResponse } from './../../../Models/Payload/Responses/AddressResponse';
import { AddressService } from './../../../Services/address.service';
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


   constructor(
      private router: Router, private appService: ApplicationService,
      private notificationService: NotificationService, private toast: Toast,
      private addressService: AddressService, private authService: AuthService
   ) { }


   ngOnInit() { 
      this.buildForm();
   }


   toRegistration(): void {
      this.router.navigate(['/register']);
   }


   private buildForm(): void {

      this.loginFormGroup = new FormGroup({
         usernameOrEmailCtrl: new FormControl(null, [Validators.required]),
         passwordCtrl: new FormControl(null, Validators.required)
      });

   }


   onLogin() {

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

            // Check if user has added their info
            this.checkHasAddedInfo();

            // Check if its the user's first login
            this.checkIfFirstLogin();

            // Get user's notifications
            this.getUserNotifications();

         }
      );

   }


   checkHasAddedInfo()
   {
      // When user info is received from server
      this.authService.currentUser.subscribe((userInfo:UserInfo) => {

         // Check if user didn't complete their information (on first login)
         if (userInfo && !(userInfo.hasAddedInfo)) {
            // Navigate to the information completion page
            this.router.navigate(['/info-completion']);
         }
         else {
            // Navigate to main tabs
            this.router.navigate(['']);
         }

      });
   }


   checkIfFirstLogin()
   {
      // When user info is received from server
      this.authService.currentUser.subscribe((userInfo:UserInfo) => {
         
         // If user is logged in and its the user's first time login
         if (userInfo && userInfo.firstLogin) 
         {
            // Generate an address for the user
            this.generateUserAddress(userInfo);
         }

      });
   }


   generateUserAddress(userInfo:UserInfo)
   {
      // Generate an address for the user to be saved on local DB
      this.addressService.generateUserAddress().subscribe(

         async (addressResponse:AddressResponse) => {

            // Get current user id
            let userID: number = this.authService.getCurrentUser().id;

            // Persist address locally
            await this.addressService.saveUserAddress(addressResponse, userID);
         },

         (error:ErrorResponse) => {
            // If user already has an address (HTTP 409 Conflict)
            if (error.httpStatus == 409) {
               // Do nothing
            }
            else {
               this.toast.show(error.message,'2000', 'bottom');
            }
         }

      );
   }


   getUserNotifications()
   {
      this.notificationService.pollNotifications().subscribe(
         response => {

            let notifications: Notification[] = response.resources;

            // If the user has notificaitons
            if (notifications.length > 0) {

               // Set current notifications subject
               this.notificationService.setNotifications(notifications);

               // Set notifications status as true
               this.notificationService.setHasNotifications(true);

               // If app is in background
               if (this.appService.getIsOnBackground()) {
                  // Show a push notification
                  this.appService.presentToast('Check your EHRoute notifications');
               }

            }
            else {
               // Clear out user notifications
               this.notificationService.setNotifications(null);
               this.notificationService.setHasNotifications(false);
            }
            
         },

         (error:ErrorResponse) => {
            this.toast.show(error.message, '2000', 'bottom').subscribe();
         }
      );
   }
}
