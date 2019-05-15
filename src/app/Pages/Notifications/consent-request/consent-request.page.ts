import { ApplicationService } from './../../../Services/application.service';
import { PatientInfo } from './../../../Models/Payload/Requests/PatientInfo';
import { EhrPatientInfo } from './../../../Entities/EhrPatientInfo';
import { UserDataService } from './../../../Services/user-data.service';
import { Address } from './../../../Entities/Address';
import { TransactionService } from './../../../Services/transaction.service';
import { UserConsentResponse } from './../../../Models/Payload/Responses/UserConsentResponse';
import { AuthService } from './../../../Services/auth.service';
import { Router } from '@angular/router';
import { ErrorResponse } from './../../../Models/Payload/Responses/ErrorResponse';
import { NetworkDetails } from './../../../Models/Payload/Responses/NetworkDetails';
import { NetworkService } from './../../../Services/network.service';
import { ConsentRequest } from './../../../Models/Payload/Responses/ConsentRequest';
import { Notification } from './../../../Models/Payload/Responses/Notification';
import { NotificationService } from './../../../Services/notification.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import ModelMapper from 'src/app/Helpers/Utils/ModelMapper';


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
      private notificationService: NotificationService, private authService: AuthService,
      private networkService: NetworkService, public alertController: AlertController,
      private transactionService:TransactionService, private appService:ApplicationService,
      private userDataService: UserDataService, public toastController: ToastController
   ) 
   { }


   ngOnInit() {
      this.notification = this.notificationService.activeNotification.getValue();
      
      if (this.notification) {
         this.consentRequest = this.notification.reference;
      }

      this.getRequesterNetworkDetails(this.consentRequest.networkUUID);
   }


   getRequesterNetworkDetails(networkUUID:string): void {

      this.networkService.getNetworkDetails(networkUUID).subscribe(

         (response:NetworkDetails) => {
            this.requesterNetworkDetails = response;
         },

         (error:ErrorResponse) => {
            console.log(error);
         }

      );

   }


   async onConsentRequestAccept() {

      // Construct a UserConsentResponse using user's data
      let consentResponse:UserConsentResponse = await this.constructUserConsentResponse();

      // Send the consent response
      this.transactionService.sendUserEhrConsentResponse(consentResponse).subscribe(

         response => {
            console.log(response);
            this.deleteNotification();
         },

         error => {
            console.log(error);
         }

      );

   }


   async constructUserConsentResponse(): Promise<UserConsentResponse> {

      // Get current user ID
      let userID: number = this.authService.getCurrentUser().id;

      // Get user's address (also private key) from DB
      let userAddress:Address = await this.userDataService.getUserAddress();

      // Get user's info from DB
      let ehrPatientInfo:EhrPatientInfo = await this.userDataService.getEhrUserInfo();

      // Add user info into the Block in the ConsentRequest
      if (this.consentRequest) {
         let patientInfo:PatientInfo = ModelMapper.mapEhrPatientInfoToPatientInfo(ehrPatientInfo, userID);
         this.consentRequest.block.transaction.record.patientInfo = patientInfo;
      }

      // Construct a UserConsentResponse object
      let userConsentResponse:UserConsentResponse = {
         block: this.consentRequest.block,
         userPrivateKey: userAddress.privateKey,
         userAddress: userAddress.address,
         providerUUID: this.consentRequest.providerUUID,
         networkUUID: this.consentRequest.networkUUID,
         userID: userID
      }

      return userConsentResponse;

   }


   async onConsentRequestReject() {

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


   deleteNotification(): void {

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
      this.appService.navigateToTabs();
   }
}
