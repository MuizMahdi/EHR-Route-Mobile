import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/AuthGuard';


const routes: Routes = [
  { path: '', loadChildren: './Pages/Tabs/tabs-layout/tabs-layout.module#TabsLayoutPageModule', canActivate:[AuthGuard]},
  { path: 'login', loadChildren: './Pages/Auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './Pages/Auth/register/register.module#RegisterPageModule' }
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
