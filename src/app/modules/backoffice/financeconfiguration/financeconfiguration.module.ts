import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceConfigurationEditComponent } from './financeconfiguration-edit/financeconfiguration-edit.component';
import { FinanceconfigurationRoutingModule } from './financeconfiguration-routing.module';
import { FinanceconfigurationFormComponent } from './financeconfiguration-form/financeconfiguration-form.component';
import { FinanceconfigurationAddComponent } from './financeconfiguration-add/financeconfiguration-add.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService,ConfirmationService } from 'primeng/api';
import { FinanceConfigurationListComponent } from './financeconfiguration-list/financeconfiguration-list.component';
import { TableModule } from 'primeng/table';   
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    FinanceConfigurationListComponent,
    FinanceconfigurationFormComponent,
    FinanceconfigurationAddComponent,
    FinanceConfigurationEditComponent
    
  ],
  imports: [
    CommonModule,
    FinanceconfigurationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,

  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class FinanceconfigurationModule { }
