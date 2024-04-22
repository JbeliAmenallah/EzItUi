import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeductionRoutingModule } from './deduction-routing.module';
import { DeductionListComponent } from './deduction-list/deduction-list.component';
import { MessageService,ConfirmationService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';
import { DeductionFormComponent } from './deduction-form/deduction-form.component';
import { AddDeductionComponent } from './add-deduction/add-deduction.component';
import { EditDeductionComponent } from './edit-deduction/edit-deduction.component';

@NgModule({
  declarations: [
    DeductionListComponent,
    DeductionFormComponent,
    AddDeductionComponent,
    EditDeductionComponent
  ],
  imports: [
    CommonModule,
    DeductionRoutingModule,
    SharedModule
  ],
  providers : [
    ConfirmationService,
    MessageService
  ]
})
export class DeductionModule { }
