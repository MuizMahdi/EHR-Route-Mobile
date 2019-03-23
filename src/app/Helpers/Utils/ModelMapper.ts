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
}
