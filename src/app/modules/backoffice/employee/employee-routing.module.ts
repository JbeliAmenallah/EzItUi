import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
const routes: Routes = [
  {
    path:'list',
    component:EmployeesListComponent
  },
  {
    path:'add',
    component:AddEmployeeComponent
  },
  {
    path:'form',
    component:EmployeeFormComponent
  },
  {
    path:"edit/:id",
    component:EditEmployeeComponent
  },
  {
    path:'details/:id',
    component:EmployeeDetailsComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
