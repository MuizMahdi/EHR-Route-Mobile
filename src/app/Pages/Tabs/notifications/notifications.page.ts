import { NotificationService } from './../../../Services/notification.service';
import { NotificationsPageResponse } from './../../../Models/Payload/Responses/NotificationsPageResponse';
import { Notification } from 'src/app/Models/Payload/Responses/Notification';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';


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


   constructor(private notificationService:NotificationService)
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
}
