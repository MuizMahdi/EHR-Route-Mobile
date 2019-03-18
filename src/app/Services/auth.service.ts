import { UserLoginRequest } from './../Models/Payload/Requests/UserLoginRequest';
import { UserRegistrationRequest } from './../Models/Payload/Requests/UserRegistrationRequest';
import { UserInfo } from './../Models/Payload/Responses/UserInfo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable, throwError } from 'rxjs';
import { tap, shareReplay, catchError, first } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


@Injectable({
   providedIn: 'root'
})


export class AuthService 
{
   registrationUrl:string = environment.apiUrl + '/auth/signup';
   loginUrl:string = environment.apiUrl + '/auth/signin';
   getCurrentUserUrl:string = environment.apiUrl + '/users/current';
   userRolesUrl: string = environment.apiUrl + '/users/current/roles';

   currentUser: Subject<UserInfo> = new Subject<UserInfo>();
   isLoggedIn:boolean = false;


   constructor(private http:HttpClient, public toastController:ToastController) 
   { }


   public register(userRegistrationInfo: UserRegistrationRequest): Observable<any>
   {
      // Send a POST request with the user registration data
      return this.http.post(this.registrationUrl, userRegistrationInfo).pipe(

         // On registration error
         catchError(async (error) => { 
            await this.showNotification('Registration Error');
         })
         
      );
   }



   public login(userLoginInfo: UserLoginRequest): Observable<any>
   {

      return this.http.post(this.loginUrl, userLoginInfo).pipe(

         // Upon received the JWT from server
         tap(tokenResponse => {

            // Save the Json Web Token (JWT)
            this.saveSession(tokenResponse);

            // Set as logged in
            this.isLoggedIn = true;
  
            shareReplay()

         }),
         
         catchError(async (error) => { 
            await this.showNotification('Login Error');
         })

      );
   }


   public async logout()
   {
      // Remove JWT
      localStorage.removeItem('accessToken');

      // Remove user info
      localStorage.removeItem('currentUser');

      // Reset currentUser subject
      this.currentUser.next(null);
      this.currentUser = new Subject<any>();
   }


   public getCurrentUser(): UserInfo
   {
      // Get user info from local storage
      return JSON.parse(localStorage.getItem('currentUser')) as UserInfo;
   }
   

   public getCurrentUserInfo(): Observable<any>
   {
      return this.http.get(this.getCurrentUserUrl).pipe(first(),
 
         catchError(async (error) => {
            await this.showNotification('Error - getting user info');
         })

      );
   }


   public getAccessToken():any 
   {
      return localStorage.getItem('accessToken');
   }


   private saveSession(token): void
   {
      // Save the JWT in local storage
      if (token && token.accessToken) {
         localStorage.setItem('accessToken', token.accessToken)
      }

      // Save user's info in local storage
      this.saveCurrentUserInfo();
   }


   private saveCurrentUserInfo(): void
   {
      this.getCurrentUserInfo().subscribe(

         (userInfo:UserInfo) => {
            // Save the user info in local storage
            localStorage.setItem('currentUser', JSON.stringify(userInfo));

            // Set the user in the user subject, so subscribers will know when user info is received
            this.currentUser.next(userInfo);
         },

         async (error) => {
            await this.showNotification('Error - saving user info');
         }

      );
   }


   async showNotification(notificationMessage:string) 
   {
      // Show a toast notification with a message
      const toast = await this.toastController.create({
        message: notificationMessage,
        duration: 2000
      });

      toast.present();
   }

}
