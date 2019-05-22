import { UserDataService } from './user-data.service';
import { EhrPatientInfo } from './../Entities/EhrPatientInfo';
import { PatientInfo } from './../Models/Payload/Requests/PatientInfo';
import { Injectable } from '@angular/core';
import ModelMapper from '../Helpers/Utils/ModelMapper';
import { getRepository, Repository } from 'typeorm';


@Injectable({
   providedIn: 'root'
})


export class PatientInfoService 
{
   constructor(private userDataService: UserDataService) 
   { }


   async savePatientInfo(patientInfo:PatientInfo): Promise<any>
   {
      return new Promise<any>(async (resolve, reject) => {

         // Get EhrPatientInfo repository
         const patientInfoRepository = getRepository('EhrPatientInfo') as Repository<EhrPatientInfo>;

         // Check if EHRPatientInfo of current user already exists on DB
         let currentUserInfo:any = await this.userDataService.getEhrUserInfo();

         if (currentUserInfo && currentUserInfo[0].userID === patientInfo.userID) {
            resolve();
         }

         // Map patient info into an EhrPatientInfo entity
         let ehrPatientInfo:EhrPatientInfo = ModelMapper.mapPatientInfoToEhrPatientInfo(patientInfo);

         /* * * Persist the address response data on local DB * *
         *  insert() is used instead of save() because save() checks 
         *  if entity exists in DB, but a user could change any value 
         *  from the PateintInfo on info completion and it would be 
         *  considered as a non-existing entity and get saved.
         * * * * */
         await patientInfoRepository.insert(ehrPatientInfo).then(
            response => { resolve(); }
         )
         .catch(
            error => { 
               reject('Error inserting EHR patient info'); 
            }
         );

      })
      
   }
}
