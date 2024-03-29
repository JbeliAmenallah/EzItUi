import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnneeListComponent } from './annee-list/annee-list.component';
import { AnneeFormComponent } from './annee-form/annee-form.component';
import { AddAnneeComponent } from './add-annee/add-annee.component';
const routes: Routes = [
  {
    path:'list',
    component:AnneeListComponent
  },
  {
    path:'form',
    component:AnneeFormComponent
  },
  {
    path:'add',
    component:AddAnneeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnneeRoutingModule { }
