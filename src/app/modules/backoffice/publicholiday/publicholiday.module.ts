import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicholidayRoutingModule } from './publicholiday-routing.module';
import { PublicHolidayListComponent } from './holiday-list/holiday-list.component';
import { MessageService,ConfirmationService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';
import { AddPublicHolidayComponent } from './add-publicholiday/add-publicholiday.component';
import { EditPublicHolidayComponent } from './edit-publicholiday/edit-publicholiday.component';
@NgModule({
  declarations: [
    PublicHolidayListComponent,
    AddPublicHolidayComponent,
    EditPublicHolidayComponent
  ],
  imports: [
    CommonModule,
    PublicholidayRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class PublicholidayModule { }
