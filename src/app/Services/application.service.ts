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


   constructor(public toastController:ToastController) 
   { }


   public async presentToast(message) {
      const toast = await this.toastController.create({
        message,
        duration: 4000
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
