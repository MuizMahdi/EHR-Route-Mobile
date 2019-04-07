import { NgModule } from '@angular/core';
import { AuthGuard } from './Guards/AuthGuard';
import { InfoCompletionGuard } from './Guards/InfoCompletionGuard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
   { path: '', loadChildren: './Pages/Tabs/tabs-layout/tabs-layout.module#TabsLayoutPageModule', canActivate:[AuthGuard]},
   { path: 'login', loadChildren: './Pages/Auth/login/login.module#LoginPageModule' },
   { path: 'register', loadChildren: './Pages/Auth/register/register.module#RegisterPageModule' },
   { path: 'info-completion', loadChildren: './Pages/info-completion/info-completion.module#InfoCompletionPageModule' /*, canActivate:[InfoCompletionGuard]*/},
   { path: 'consent-request', loadChildren: './Pages/Notifications/consent-request/consent-request.module#ConsentRequestPageModule', canActivate:[AuthGuard]}
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
