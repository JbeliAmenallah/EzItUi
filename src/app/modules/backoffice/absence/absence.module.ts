import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsenceRoutingModule } from './absence-routing.module';
import { AbsenceListComponent } from './absence-list/absence-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AbsenceFormComponent } from './absence-form/absence-form.component';
import { ConfirmationService,MessageService } from 'primeng/api';
import { AddAbsenceComponent } from './add-absence/add-absence.component';
import { EditAbsenceComponent } from './edit-absence/edit-absence.component';
import { UsersessionComponent } from './usersession/usersession.component';



@NgModule({
  declarations: [
    AbsenceListComponent,
    AbsenceFormComponent,
    AddAbsenceComponent,
    EditAbsenceComponent,
    UsersessionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AbsenceRoutingModule,

  ],
  
  providers:[
    MessageService,
    ConfirmationService,

    
  ]
  
})
export class AbsenceModule { }
