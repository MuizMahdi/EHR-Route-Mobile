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

            // Show a toast notification
            let toast = await this.toastController.create({
               message: 'Registration Error',
               duration: 2000
            });

            toast.present();

         })
         
      );
   }
}
