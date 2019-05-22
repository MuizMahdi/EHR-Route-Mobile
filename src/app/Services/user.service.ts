import { first, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
   providedIn: 'root'
})


export class UserService 
{
   private userInfoAdditionStatusUrl:string = environment.apiUrl + '/users/current/info-addition-status';


   constructor(private http:HttpClient) 
   { }


   public updateUserInfoAdditionStatus(): Observable<any>
   {
      let url = this.userInfoAdditionStatusUrl;

      return this.http.post(url, "").pipe(first(),
      
         catchError(error => {
            return throwError(error);
         })

      );
   }
}
