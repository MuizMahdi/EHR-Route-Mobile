import { Router } from '@angular/router';
import { NotificationType } from './../../../Models/NotificationType';
import { NotificationService } from './../../../Services/notification.service';
import { NotificationsPageResponse } from './../../../Models/Payload/Responses/NotificationsPageResponse';
import { Notification } from 'src/app/Models/Payload/Responses/Notification';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss']
})


export class NotificationsPage implements OnInit
{
   hasNewNotifications:boolean;

   notifications:Notification[];
   notificationsResponse:NotificationsPageResponse;


   constructor(private notificationService:NotificationService, private router:Router)
   { }


   ngOnInit()
   {
      this.getUserNotifications();
   }


   getUserNotifications()
   {
      // On notifications change
      this.notificationService.notifications.subscribe(notifications => {
         if (notifications) {
            this.notifications = notifications;

            if (this.notifications.length == 0) {
               this.hasNewNotifications = false;
            }
            else {
               this.hasNewNotifications = true;
            }
         }
      });
   }


   notificationMessageBuilder(notification:Notification): string
   {
      switch(notification.notificationType) {

         case NotificationType.CONSENT_REQUEST: {
            return notification.senderName + 
            " is asking for consent to use and share your medical record";
         }

         case NotificationType.UPDATE_CONSENT_REQUEST: {
            return notification.senderName + 
            " is asking for consent to update your medical record";
         }

         default: { 
            break; 
         }

      }
   }


   onNotificationClick(notification:Notification): void
   {
      switch(notification.notificationType) {

         case NotificationType.CONSENT_REQUEST: {

            // Navigate to the conset request info page
            this.router.navigate(['/consent-request']);


            // Set notification as active notification
            this.notificationService.setActiveNotification(notification);

            break;

         }

         case NotificationType.UPDATE_CONSENT_REQUEST: {

            // Set notification as active notification
            this.notificationService.setActiveNotification(notification);

            // Navigate to the update consent request info page
            this.router.navigate(['/update-consent-request']);

            break;

         }

         default: { 
            break; 
         }

      }
   }
}
