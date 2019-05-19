import { ApplicationService } from './Services/application.service';
import { Toast } from '@ionic-native/toast/ngx';
import { NotificationService } from './Services/notification.service';
import { EhrPatientInfo } from './Entities/EhrPatientInfo';
import { Address } from './Entities/Address';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
      private statusBar: StatusBar, private notificationService:NotificationService
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
      // configure database connection
      if(this.platform.is('cordova')) 
      {
         await createConnection({
            type: 'cordova',
            database: 'user_data',
            location: 'default',
            logging: true,
            synchronize: true,
            entities: [
               Address,
               EhrPatientInfo
            ]
         });
      }
   }
}
