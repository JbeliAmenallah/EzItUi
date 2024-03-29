import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnneeRoutingModule } from './annee-routing.module';
import { AnneeListComponent } from './annee-list/annee-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmationService,MessageService } from 'primeng/api';
import { AnneeFormComponent } from './annee-form/annee-form.component';
import { AddAnneeComponent } from './add-annee/add-annee.component';
import { EditAnneeComponent } from './annee-edit/annee-edit.component';
@NgModule({
  declarations: [
    AnneeListComponent,
    AnneeFormComponent,
    AddAnneeComponent,
    EditAnneeComponent
  ],
  imports: [
    CommonModule,
    AnneeRoutingModule,
    SharedModule
  ],
  providers:[
    ConfirmationService,
    MessageService
  ]
})
export class AnneeModule { }
