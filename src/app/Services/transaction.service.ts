import { first, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserConsentResponse } from './../Models/Payload/Responses/UserConsentResponse';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class TransactionService 
{
   private giveUserEhrConsentUrl:string = environment.apiUrl + '/transaction/give-consent';


   constructor(private http:HttpClient) 
   { }


   sendUserEhrConsentResponse(consentResponse:UserConsentResponse): Observable<any>
   {
      return this.http.post(this.giveUserEhrConsentUrl, consentResponse).pipe(first(),

         catchError(error => {
            return throwError(error);
         })

      );
   }
}
