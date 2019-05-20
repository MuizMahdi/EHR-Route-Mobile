import { NotificationService } from './../../../Services/notification.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tabs-layout',
  templateUrl: 'tabs-layout.page.html',
  styleUrls: ['tabs-layout.page.scss']
})


export class TabsLayoutPage implements OnInit
{
   numberOfNotifications:number = 0;

   constructor(private notificationService:NotificationService)
   { }


   ngOnInit()
   {
      this.getNotifications();
   }


   getNotifications()
   {
      this.notificationService.notifications.subscribe(notifications => {
         
         if (notifications) {
            this.numberOfNotifications = notifications.length;
         }
         else {
            this.numberOfNotifications = 0;
         }

      });
   }
}
