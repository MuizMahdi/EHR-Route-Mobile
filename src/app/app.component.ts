import { ErrorResponse } from 'src/app/Models/Payload/Responses/ErrorResponse';
import { Toast } from '@ionic-native/toast/ngx';
import { NotificationService } from './Services/notification.service';
import { EhrPatientInfo } from './Entities/EhrPatientInfo';
import { Address } from './Entities/Address';
import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Notification } from 'src/app/Models/Payload/Responses/Notification';
import { createConnection } from 'typeorm'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})


export class AppComponent 
{
   isInBackground:boolean = false;


   constructor(
      private platform: Platform, private splashScreen: SplashScreen,
      private statusBar: StatusBar, private notificationService:NotificationService,
      public toastController:ToastController, private toast:Toast
   ) {
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
            this.isInBackground = true;
         });

         // When app is open (on foreground)
         this.platform.resume.subscribe(() => {
            this.isInBackground = false;
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
      console.log('GETTING NOTIFICATIONS ON APP.COMPONENT');
      
      this.notificationService.pollNotifications().subscribe(
         response => {

            let notifications:Notification[] = response.resources;

            // If the user has notificaitons
            if (notifications.length > 0) {

               console.log(notifications);

               // Set current notifications subject
               this.notificationService.setNotifications(notifications);

               // Set notifications status as true
               this.notificationService.setHasNotifications(true);

               // If app is in background
               if (this.isInBackground) {
                  // Show a push notification
                  this.presentToast('You have a notification');
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



   private async presentToast(message) {
      const toast = await this.toastController.create({
        message,
        duration: 4000
      });
      toast.present();
   }

}
