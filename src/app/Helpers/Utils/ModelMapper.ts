import { PatientInfo } from './../../Models/Payload/Requests/PatientInfo';
import { EhrPatientInfo } from './../../Entities/EhrPatientInfo';
import { Address } from './../../Entities/Address';
import { AddressResponse } from './../../Models/Payload/Responses/AddressResponse';


export default class ModelMapper
{
   public static mapAddressResponseToAddress(addressResponse:AddressResponse): Address
   {
      const address = new Address();

      address.address = addressResponse.address;
      address.publicKey = addressResponse.publicKey;
      address.privateKey = addressResponse.privateKey;
      
      return address;
   }


   public static mapPatientInfoToEhrPatientInfo(patientInfo:PatientInfo): EhrPatientInfo
   {
      const ehrPatientInfo = new EhrPatientInfo();

      ehrPatientInfo.name = patientInfo.name;
      ehrPatientInfo.phone = patientInfo.phone;
      ehrPatientInfo.birthDate = patientInfo.birthDate;
      ehrPatientInfo.email = patientInfo.email;
      ehrPatientInfo.gender = patientInfo.gender;
      ehrPatientInfo.city = patientInfo.city;
      ehrPatientInfo.country = patientInfo.country;
      ehrPatientInfo.address = patientInfo.address;
      ehrPatientInfo.userID = patientInfo.userID;

      return ehrPatientInfo;
   }

   
   public static mapEhrPatientInfoToPatientInfo(ehrPatientInfo:EhrPatientInfo, userId:number): PatientInfo
   {
      const patientInfo:PatientInfo = {
         name: ehrPatientInfo.name,
         gender: ehrPatientInfo.gender,
         country: ehrPatientInfo.country,
         city: ehrPatientInfo.city,
         address: ehrPatientInfo.address,
         phone: ehrPatientInfo.phone,
         birthDate: ehrPatientInfo.birthDate,
         email: ehrPatientInfo.email,
         userID: userId
      }

      return patientInfo;
   }
}
