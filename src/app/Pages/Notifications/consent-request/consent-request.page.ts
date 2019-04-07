import { ErrorResponse } from './../../../Models/Payload/Responses/ErrorResponse';
import { NetworkDetails } from './../../../Models/Payload/Responses/NetworkDetails';
import { NetworkService } from './../../../Services/network.service';
import { ConsentRequest } from './../../../Models/Payload/Responses/ConsentRequest';
import { Notification } from './../../../Models/Payload/Responses/Notification';
import { NotificationService } from './../../../Services/notification.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-consent-request',
  templateUrl: './consent-request.page.html',
  styleUrls: ['./consent-request.page.scss'],
})


export class ConsentRequestPage implements OnInit 
{
   notification:Notification;
   consentRequest: ConsentRequest;
   requesterNetworkDetails: NetworkDetails;


   constructor(private notificationService:NotificationService, private networkService:NetworkService) 
   { }


   ngOnInit() 
   {
      this.notification = this.notificationService.activeNotification.getValue();
      
      if (this.notification) {
         this.consentRequest = this.notification.reference;
      }

      this.getRequesterNetworkDetails(this.consentRequest.networkUUID);
   }


   getRequesterNetworkDetails(networkUUID:string): void
   {
      this.networkService.getNetworkDetails(networkUUID).subscribe(

         (response:NetworkDetails) => {
            this.requesterNetworkDetails = response;
         },

         (error:ErrorResponse) => {
            console.log(error);
         }

      );
   }

}
