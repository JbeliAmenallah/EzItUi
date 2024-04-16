import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryRoutingModule } from './salary-routing.module';
import { GenerateComponent } from './generate/generate.component';
import { SharedModule } from '../../../shared/shared.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    GenerateComponent
  ],
  imports: [
    CommonModule,
    SalaryRoutingModule,
    SharedModule
  ],
  providers :[

  ]
})
export class SalaryModule { }
