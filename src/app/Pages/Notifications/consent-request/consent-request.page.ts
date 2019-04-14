import { Router } from '@angular/router';
import { ErrorResponse } from './../../../Models/Payload/Responses/ErrorResponse';
import { NetworkDetails } from './../../../Models/Payload/Responses/NetworkDetails';
import { NetworkService } from './../../../Services/network.service';
import { ConsentRequest } from './../../../Models/Payload/Responses/ConsentRequest';
import { Notification } from './../../../Models/Payload/Responses/Notification';
import { NotificationService } from './../../../Services/notification.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


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


   constructor(
      private notificationService:NotificationService, public alertController: AlertController,
      private networkService:NetworkService, private router:Router
   ) 
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


   async onConsentRequestReject()
   {
      // View an alert modal asking for confirmation
      const alert = await this.alertController.create({
         header: 'Confirm Rejection',
         message: 'Are you sure that you want to reject the request?, rejected requests will be deleted.',
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: () => {
                  console.log('Confirm Canceled');
               }
            }, {
               text: 'Okay',
               handler: () => {
                  this.deleteNotification(); 
               }
            }
         ]
      });
   
      await alert.present();
   }


   deleteNotification(): void
   {
      this.notificationService.deleteNotification(this.notification.notificationID).subscribe( 

         response => {
            console.log(response);
         },

         error => {
            console.log(error);
         }

      );
   }


   navigateBack() {
      // Navigate back to main tabs
      this.router.navigate(['']);
   }
}
