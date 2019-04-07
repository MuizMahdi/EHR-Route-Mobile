import { first, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class NetworkService 
{
   private networkDetailsUrl:string = environment.apiUrl + '/network/details';


   constructor(private http:HttpClient) 
   { }


   public getNetworkDetails(networkUUID:string): Observable<any> {

      let url:string = this.networkDetailsUrl + '?networkuuid=' + networkUUID;

      return this.http.get(url).pipe(first(),

         catchError(error => {
            return throwError(error);
         })

      );

   }
}
