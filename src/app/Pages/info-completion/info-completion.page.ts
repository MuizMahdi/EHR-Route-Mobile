import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { PatientInfoService } from './../../Services/patient-info.service';
import { PatientInfo } from './../../Models/Payload/Requests/PatientInfo';
import { AuthService } from './../../Services/auth.service';
import { LocationService } from './../../Services/location.service';
import { CountryResponse } from './../../Models/Payload/Responses/CountryResponse';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Component({
   selector: 'app-info-completion',
   templateUrl: './info-completion.page.html',
   styleUrls: ['./info-completion.page.scss'],
})


export class InfoCompletionPage implements OnInit 
{
   userInfoForm: FormGroup;

   countries:CountryResponse[];
   countryCities:any;
   countryInputValue: string;

   infoSaveLoading = this.loadingController.create({
      message: 'Saving Info...'
   });


   constructor(
      private authService:AuthService, private patientInfoService:PatientInfoService,
      public loadingController:LoadingController, private locationService:LocationService,
      private userService:UserService, private router:Router
   ) { }


   ngOnInit() 
   {
      this.buildForm();
      this.getCountries();
   }


   private buildForm(): void
   {
      this.userInfoForm = new FormGroup({
         nameCtrl: new FormControl(null, [Validators.required]),
         birthCtrl: new FormControl(null, [Validators.required]), // Intended
         genderSelectCtrl: new FormControl(null, [Validators.required]),
         phoneCtrl: new FormControl(null, [Validators.required]),
         countryCtrl: new FormControl(null, [Validators.required]),
         cityCtrl: new FormControl(null, [Validators.required]),
         addressCtrl: new FormControl(null, [Validators.required])
      });
   }


   getCountries()
   {
      this.locationService.getCountries().subscribe(countriesData => {
         this.countries = countriesData['_links']['country:items'];
      });
   }


   private async onCountrySelect(country:string)
   {
      // Show a loading spinner while fetching the country's cities
      const citiesLoading = await this.loadingController.create({
         message: 'Loading Cities...'
      });

      citiesLoading.present();

      // Get the country's cities
      this.locationService.getCities(country).subscribe(citiesData => {

         this.countryCities = citiesData['_embedded']['city:search-results'];

         // Dismiss the loading spinner
         citiesLoading.dismiss();

      });  
   }
   

   private getPatientInfo(): PatientInfo
   {
      // Get current user's data
      let userEmail = this.authService.getCurrentUser().email;
      let userID = this.authService.getCurrentUser().id;

      // Construct a PatientInfo object using form data
      let userInfo:PatientInfo = {
         name: this.userInfoForm.get("nameCtrl").value,
         gender: this.userInfoForm.get("genderSelectCtrl").value,
         birthDate: this.userInfoForm.get("birthCtrl").value.getTime(),
         phone: this.userInfoForm.get("phoneCtrl").value,
         country: this.userInfoForm.get("countryCtrl").value.trim(),
         city: this.userInfoForm.get("cityCtrl").value.trim(),
         address: this.userInfoForm.get("addressCtrl").value,
         email: userEmail,
         userID: userID
      }

      return userInfo;
   }


   private async onUserInfoSubmit()
   {
      // Construct EhrPatientInfo object from form data
      let pateintInfo = this.getPatientInfo();

      // Show a loading spinner while saving user info locally
      await this.infoSaveLoading.then(loading => loading.present());

      // Save patient info on local DB
      await this.patientInfoService.savePatientInfo(pateintInfo).then(success => {
         if (success) {
            this.setUserHasSavedInfo();
         }
      });
   }

   private async setUserHasSavedInfo()
   {
      // Update the user info addition status boolean to true
      this.userService.updateUserInfoAdditionStatus().subscribe(

         async response => {

            // Once successfully updated, dismiss the loading spinner
            await this.infoSaveLoading.then(loading => loading.dismiss());

            // Then navigate to the main page (tabs)
            this.router.navigate(['']);
            
         },

         error => {
            console.log(error);
         }

      );
      
   }
}
