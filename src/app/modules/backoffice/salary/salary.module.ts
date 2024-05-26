import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryRoutingModule } from './salary-routing.module';
import { GenerateComponent } from './generate/generate.component';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { SalaryTemplateComponent } from './salary-template/salary-template.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    GenerateComponent,
    SalaryListComponent,
    SalaryTemplateComponent,
   

  ],
  imports: [
    CommonModule,
    SalaryRoutingModule,
    SharedModule,
    ToastModule 
  ],
  providers :[
    MessageService,
    ConfirmationService,
  ]
})
export class SalaryModule { }
