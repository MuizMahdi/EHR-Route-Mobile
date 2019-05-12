import { getRepository, Repository } from 'typeorm';
import { EhrPatientInfo } from './../Entities/EhrPatientInfo';
import { Injectable } from '@angular/core';
import { Address } from '../Entities/Address';


@Injectable({
   providedIn: 'root'
})


export class UserDataService 
{
   constructor() 
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
      // Get EhrPatientInfo repository
      const patientInfoRepository = getRepository('EhrPatientInfo') as Repository<EhrPatientInfo>;

      // Return EhrPatientInfo from DB
      return await patientInfoRepository.findOne();
   }
}
