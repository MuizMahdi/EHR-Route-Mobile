import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsLayoutPage } from './tabs-layout.page';

const routes: Routes = [
   {
      path: 'tabs',
      component: TabsLayoutPage,
      children: [
         {
            path: 'home',
            children: [
               {
                  path: '',
                  loadChildren: '../home/home.module#HomePageModule'
               }
            ]
         },
         {
            path: 'notifications',
            children: [
               {
                  path: '',
                  loadChildren: '../notifications/notifications.module#NotificationsPageModule'
               }
            ]
         },
         {
            path: 'settings',
            children: [
               {
                  path: '',
                  loadChildren: '../settings/settings.module#SettingsPageModule'
               }
            ]
         },
         {
            path: '',
            redirectTo: '/tabs/home',
            pathMatch: 'full'
         }
      ]
   },
   {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full'
   }
];


@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [RouterModule]
})


export class TabsPageRoutingModule {}
