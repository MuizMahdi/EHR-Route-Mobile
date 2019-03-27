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


   constructor(private notificationService:NotificationService)
   { }


   ngOnInit()
   {
      this.getUserNotifications();
   }


   getUserNotifications()
   {
      this.notificationService.getUserNotifications().subscribe(

         response => {
            
            this.notificationsResponse = response;

            this.notifications = this.notificationsResponse.resources;
            
            if (this.notifications.length == 0) {
               this.hasNewNotifications = false;
            }
            else {
               this.hasNewNotifications = true;
            }

         },

         error => {
            console.log(error);
         }

      );
   }


   
}
