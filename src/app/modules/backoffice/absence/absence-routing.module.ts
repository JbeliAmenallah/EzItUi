import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceListComponent } from './absence-list/absence-list.component';
import { AbsenceFormComponent } from './absence-form/absence-form.component';
import { AddAbsenceComponent } from './add-absence/add-absence.component';
import { EditAbsenceComponent } from './edit-absence/edit-absence.component';
import { UsersessionComponent } from './usersession/usersession.component';

const routes: Routes = [
  {
    path:"list",
    component:AbsenceListComponent
  },
  {
    path:'form',
    component:AbsenceFormComponent
  },
  {
    path:'add',
    component:AddAbsenceComponent
  },
  { path: 'edit/:id',
   component: EditAbsenceComponent 
  },
  {
    path:'session',
    component:UsersessionComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsenceRoutingModule { }
