import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { PolicyListComponent } from './policy-list/policy-list.component';

const routes: Routes = [
  {
    path:'list',
    component:PolicyListComponent
  },  {
    path:'add',
    component:AddPolicyComponent
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
