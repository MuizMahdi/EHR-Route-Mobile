import { Address } from './../Entities/Address';
import { AddressResponse } from './../Models/Payload/Responses/AddressResponse';
import { Toast } from '@ionic-native/toast/ngx';
import { first, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import ModelMapper from '../Helpers/Utils/ModelMapper';
import { getRepository, Repository } from 'typeorm';


@Injectable({
  providedIn: 'root'
})

export class AddressService 
{
   private addressGenerationUrl:string = environment.apiUrl + '/address/generate';


   constructor(private http:HttpClient, private toast:Toast) 
   { }


   public generateUserAddress(): Observable<any>
   {
      return this.http.get(this.addressGenerationUrl).pipe(first(),
         catchError(error => {
            return throwError(error);
         })
      );
   }


   public async saveUserAddress(addressResponse:AddressResponse, userID:number)
   {
      // Get address repository
      const addressRepository = getRepository('address') as Repository<Address>;

      // Map the address response to address
      let address:Address = ModelMapper.mapAddressResponseToAddress(addressResponse);

      // Persist the address response data
      await addressRepository.save(address);
   }
}
