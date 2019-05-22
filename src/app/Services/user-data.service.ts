import { AuthService } from './auth.service';
import { getRepository, Repository } from 'typeorm';
import { EhrPatientInfo } from './../Entities/EhrPatientInfo';
import { Injectable } from '@angular/core';
import { Address } from '../Entities/Address';


@Injectable({
   providedIn: 'root'
})


export class UserDataService 
{
   constructor(private authService: AuthService) 
   { }


   async getUserAddress(): Promise<Address>
   {
      // Get Address repository
      const addressRepository = getRepository('Address') as Repository<Address>;

      // Return user's address from DB
      return await addressRepository.findOne();
   }


   async getEhrUserInfo(): Promise<EhrPatientInfo>
   {
      let currentUserId = this.authService.getCurrentUser().id;

      // Get EhrPatientInfo repository
      const patientInfoRepository = getRepository('EhrPatientInfo') as Repository<EhrPatientInfo>;

      // Return the current user's EHR info from DB
      return await patientInfoRepository.findOne({
         where: {
            userID: currentUserId
         }
      });
   }
}
