import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceconfigurationRoutingModule } from './financeconfiguration-routing.module';
import { FinanceconfigurationFormComponent } from './financeconfiguration-form/financeconfiguration-form.component';
import { FinanceconfigurationAddComponent } from './financeconfiguration-add/financeconfiguration-add.component';
import { FinanceconfigurationEditComponent } from './financeconfiguration-edit/financeconfiguration-edit.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService,ConfirmationService } from 'primeng/api';
import { FinanceConfigurationListComponent } from './financeconfiguration-list/financeconfiguration-list.component';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    FinanceConfigurationListComponent,
    FinanceconfigurationFormComponent,
    FinanceconfigurationAddComponent,
    FinanceconfigurationEditComponent
  ],
  imports: [
    CommonModule,
    FinanceconfigurationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule

  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class FinanceconfigurationModule { }
