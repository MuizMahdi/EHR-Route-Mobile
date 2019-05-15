import { ErrorResponse } from './Models/Payload/Responses/ErrorResponse';
import { ApplicationService } from './Services/application.service';
import { Toast } from '@ionic-native/toast/ngx';
import { NotificationService } from './Services/notification.service';
import { EhrPatientInfo } from './Entities/EhrPatientInfo';
import { Address } from './Entities/Address';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Notification } from 'src/app/Models/Payload/Responses/Notification';
import { createConnection } from 'typeorm'


@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html'
})


export class AppComponent implements OnInit
{
   constructor(
      private platform: Platform, private toast:Toast,
      private appService:ApplicationService, private splashScreen: SplashScreen,
      private statusBar: StatusBar, private notificationService:NotificationService,
   ) { }


   ngOnInit() {
      this.initializeApp();
      this.initializeDatabase();
   }


   initializeApp() 
   {
      this.platform.ready().then(() => {
         this.statusBar.styleDefault();
         this.splashScreen.hide();
         this.getNotifications();

         // When app is closed (on background)
         this.platform.pause.subscribe(() => {
            // If app is set as not on background
            if (!this.appService.getIsOnBackground) {
               // Set it as on background
               this.appService.setIsOnBackground(true);
            }
         });

         // When app is open (on foreground)
         this.platform.resume.subscribe(() => {
            // If app is set as on background
            if (this.appService.getIsOnBackground) {
               // Set as not
               this.appService.setIsOnBackground(false);
            }
         });

      });
   }


   async initializeDatabase()
   {
      // Depending on the machine the app is running on,
      // configure different database connections

      // Running on device or emulator
      if(this.platform.is('cordova')) 
      {
         await createConnection({
            type: 'cordova',
            database: 'test',
            location: 'default',
            logging: ['error', 'query', 'schema'],
            synchronize: true,
            entities: [
               Address,
               EhrPatientInfo
            ]
         });
      }
      else 
      {
         // Running in browser
         await createConnection({
            type: 'sqljs',
            autoSave: true,
            location: 'browser',
            logging: ['error', 'query', 'schema'],
            synchronize: true,
            entities: [
               Address,
               EhrPatientInfo
            ]
         });
      }
   }


   getNotifications()
   {
      this.notificationService.pollNotifications().subscribe(
         response => {

            let notifications:Notification[] = response.resources;

            // If the user has notificaitons
            if (notifications.length > 0) {

               // Set current notifications subject
               this.notificationService.setNotifications(notifications);

               // Set notifications status as true
               this.notificationService.setHasNotifications(true);

               // If app is in background
               if (this.appService.getIsOnBackground) {
                  // Show a push notification
                  this.appService.presentToast('You have a notification');
               }  

            }
            else {
               // Clear out user notifications
               this.notificationService.setNotifications(null);
               this.notificationService.setHasNotifications(false);
            }
            
         },

         (error:ErrorResponse) => {
            this.toast.show(error.message, '2000', 'bottom').subscribe();
         }
      );
   }

}
