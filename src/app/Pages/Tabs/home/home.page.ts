import { UserDataService } from './../../../Services/user-data.service';
import { Component } from '@angular/core';


@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss']
})


export class HomePage
{

   constructor(
      private userDataService:UserDataService
   )
   { }


   /* 
   *  For debugging only, will be removed 
   */
   async test()
   {
      let ehrPatientInfo:any = await this.userDataService.getEhrUserInfo()
      .then(
         val => document.getElementById("text").innerHTML = JSON.stringify(val)
      )
      .catch(
         err => document.getElementById("text").innerHTML = JSON.stringify(err)
      );
   }

}
