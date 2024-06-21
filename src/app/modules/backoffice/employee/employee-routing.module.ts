import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { NotallowedComponent } from '../notallowed/notallowed.component';
import { EmployeeSessionComponent } from './employee-session/employee-session.component';
import { UsersCarouselComponent } from './users-carousel/users-carousel.component';
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';

const routes: Routes = [
  {
    path: 'list',
    component: EmployeesListComponent,
    data: { title: 'Employees List' }
  },
  {
    path: 'add',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard],
    data: { title: 'Employees add', roles: ['ADMIN'] }
  },
  {
    path: 'form',
    component: EmployeeFormComponent
  },
  {
    path: "edit/:id",
    component: EditEmployeeComponent
  }, {
    path: 'not-allowed',
    component: NotallowedComponent
  },

  {
    path: 'conges',
    component: EmployeeSessionComponent,

  }
  ,
  {
    path: 'details',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Employees Details', roles: ['ADMIN'] }
  },{
    path:'contacts',
    component:UsersCarouselComponent
  },
  {path:'profile',component:EmployeeProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
