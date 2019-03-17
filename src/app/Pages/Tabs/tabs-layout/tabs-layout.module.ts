import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-layout.router.module';
import { TabsLayoutPage } from './tabs-layout.page';


@NgModule({

   imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      TabsPageRoutingModule
   ],

   declarations: [
      TabsLayoutPage
   ]

})


export class TabsLayoutPageModule {}
