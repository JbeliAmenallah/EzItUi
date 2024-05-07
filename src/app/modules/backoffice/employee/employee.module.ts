import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmationService,MessageService } from 'primeng/api';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { StyleClassModule } from 'primeng/styleclass';
import { ChartModule } from 'primeng/chart';





@NgModule({
  declarations: [
    EmployeesListComponent,
    AddEmployeeComponent,
    EmployeeFormComponent,
    EditEmployeeComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ChartModule,
    StyleClassModule,
    ChartModule
  ],
  providers: [
    ConfirmationService, 
    MessageService 
  ]
})
export class EmployeeModule { }
