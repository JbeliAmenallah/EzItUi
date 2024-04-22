import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { DeductionListComponent } from './deduction-list/deduction-list.component';
import { DeductionFormComponent } from './deduction-form/deduction-form.component';
import { AddDeductionComponent } from './add-deduction/add-deduction.component';
import { EditDeductionComponent } from './edit-deduction/edit-deduction.component';
const routes: Routes = [
  {
    path:'list',
    component:DeductionListComponent
  },
  {
    path:'form',
    component:DeductionFormComponent
  },
  {
    path:'add',
    component:AddDeductionComponent
  },{
    path:'edit/:id',
    component:EditDeductionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeductionRoutingModule { }
