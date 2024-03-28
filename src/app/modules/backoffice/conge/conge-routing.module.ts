import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcongeComponent } from './addconge/addconge.component';
import { CongeListComponent } from './conge-list/conge-list.component';

const routes: Routes = [{
  path:"add",
  component:AddcongeComponent
},
{
  path:"list",
  component:CongeListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongeRoutingModule { }
