import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
