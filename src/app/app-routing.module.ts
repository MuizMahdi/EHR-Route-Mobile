import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './Pages/Tabs/tabs-layout/tabs-layout.module#TabsLayoutPageModule' },
  { path: 'login', loadChildren: './Pages/Auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './Pages/Auth/register/register.module#RegisterPageModule' },
  { path: 'health-record', loadChildren: './Pages/Tabs/health-record/health-record.module#HealthRecordPageModule' }
];


@NgModule({

   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
   ],

   exports: [
      RouterModule
   ]

})


export class AppRoutingModule {}
