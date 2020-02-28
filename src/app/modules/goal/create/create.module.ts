import { TeamsPageModule } from './../modal/teams/teams.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { MbscModule } from '@mobiscroll/angular';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    MbscModule,
    CreatePageRoutingModule,
    TeamsPageModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
