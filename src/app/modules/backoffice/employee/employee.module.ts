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
import { FullCalendarModule } from '@fullcalendar/angular';
import { EmployeeSessionComponent } from './employee-session/employee-session.component';








@NgModule({
  declarations: [
    EmployeesListComponent,
    AddEmployeeComponent,
    EmployeeFormComponent,
    EditEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeSessionComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StyleClassModule,
    ChartModule,
    FullCalendarModule
  ],
  providers: [
    ConfirmationService, 
    MessageService 
  ]
})
export class EmployeeModule { }
