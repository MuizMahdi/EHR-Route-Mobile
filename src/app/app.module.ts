import { AuthGuard } from './Guards/AuthGuard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({

   declarations: [
      AppComponent
   ],

   entryComponents: [],

   imports: [
      BrowserModule, 
      IonicModule.forRoot({
         rippleEffect: false
      }), 
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],

   providers: [
      Toast,
      StatusBar,
      SplashScreen,
      AuthGuard,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
   ],

   bootstrap: [
      AppComponent
   ]

})


export class AppModule {}
