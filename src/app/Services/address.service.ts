import { AddressResponse } from './../Models/Payload/Responses/AddressResponse';
import { ErrorResponse } from './../Models/Payload/Responses/ErrorResponse';
import { Toast } from '@ionic-native/toast/ngx';
import { first, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AddressService 
{
   private addressGenerationUrl:string = environment.apiUrl + '/address/generate';


   constructor(private http:HttpClient) 
   { }


   public generateUserAddress(): Observable<any>
   {
      return this.http.get(this.addressGenerationUrl).pipe(first(),
         catchError(error => {
            return throwError(error);
         })
      );
   }

}
