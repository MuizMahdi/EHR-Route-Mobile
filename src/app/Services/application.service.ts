import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
   providedIn: 'root'
})


export class ApplicationService 
{
   // Indicates whether the app is running on background or not
   isOnBackground: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


   constructor(
      public toastController:ToastController, private router:Router
   ) 
   { }


   public navigateToTabs() {
      // Navigate back to main tabs page
      return this.router.navigate(['']);
   }


   public async presentToast(message) {

      const toast = await this.toastController.create({
         message,
         duration: 5000,
         position: 'bottom',
         showCloseButton: true,
         closeButtonText: 'OK',
         cssClass: 'toast',
         animated: true
      });

      toast.present();
      
   }


   public getIsOnBackground(): boolean {
      return this.isOnBackground.value;
   }


   public setIsOnBackground(state:boolean): void {
      this.isOnBackground.next(state);
   }
}
