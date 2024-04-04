import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfantRoutingModule } from './enfant-routing.module';
import { EnfantListComponent } from './enfant-list/enfant-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmationService,MessageService } from 'primeng/api';
import { EnfantFormComponent } from './enfant-form/enfant-form.component';
import { EnfantAddComponent } from './enfant-add/enfant-add.component';
import { EditEnfantComponent } from './enfant-edit/enfant-edit.component';
@NgModule({
  declarations: [
    EnfantListComponent,
    EnfantFormComponent,
    EnfantAddComponent,
    EditEnfantComponent
  ],
  imports: [
    CommonModule,
    EnfantRoutingModule,
    SharedModule
  ],
  providers:[
    ConfirmationService,
    MessageService
  ]
})
export class EnfantModule { }
