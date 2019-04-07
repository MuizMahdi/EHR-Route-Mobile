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


   constructor(private notificationService:NotificationService) 
   { }


   ngOnInit() 
   {
      this.notification = this.notificationService.activeNotification.getValue();
      
      if (this.notification) {
         this.consentRequest = this.notification.reference;
      }
   }

}
