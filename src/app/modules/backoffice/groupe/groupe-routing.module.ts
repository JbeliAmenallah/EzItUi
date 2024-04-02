import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupeComponent } from './add-groupe/add-groupe.component';
import { GroupeListComponent } from './groupe-list/groupe-list.component';
const routes: Routes = [

  {
    path:'list',
    component:GroupeListComponent
  },
  {
    path:'add',
    component:AddGroupeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeRoutingModule { }
