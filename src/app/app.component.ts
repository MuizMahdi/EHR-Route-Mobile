import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { createConnection } from 'typeorm'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})


export class AppComponent 
{

   constructor(
      private platform: Platform, private splashScreen: SplashScreen,
      private statusBar: StatusBar
   ) {
      this.initializeApp();
      this.initializeDatabase();
   }


   initializeApp() 
   {
      this.platform.ready().then(() => {
         this.statusBar.styleDefault();
         this.splashScreen.hide();
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

            ]
         });
      }
   }

}
