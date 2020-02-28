import { IonicStorageModule } from '@ionic/storage';
import { TeamsPageModule } from './../../goal/modal/teams/teams.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,
    TeamsPageModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
