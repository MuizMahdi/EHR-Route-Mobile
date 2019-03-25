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
   constructor() 
   { }


   async savePatientInfo(patientInfo:PatientInfo): Promise<boolean>
   {
      // Indicates whether patient info was saved successfully or not
      let success:boolean;

      // Get EhrPatientInfo repository
      const patientInfoRepository = getRepository('EhrPatientInfo') as Repository<EhrPatientInfo>;

      // Map patient info into an EhrPatientInfo entity
      let ehrPatientInfo:EhrPatientInfo = ModelMapper.mapPatientInfoToEhrPatientInfo(patientInfo);

      // Persist the address response data
      await patientInfoRepository.save(ehrPatientInfo).then(

         response => {
            success = true;
         }

      )
      .catch(

         error => {
            success = false;
         }

      )

      return success; 
   }
}
