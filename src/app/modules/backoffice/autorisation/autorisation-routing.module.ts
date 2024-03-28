import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorisationListComponent } from './autorisation-list/autorisation-list.component';
import { EditAutorisationComponent } from './edit-autorisation/edit-autorisation.component';
import { AddAutorisationComponent } from './add-autorisation/add-autorisation.component';
const routes: Routes = [
  {
    path:'',
    component:AutorisationListComponent,
    
  },{
    path:'edit',
    component:EditAutorisationComponent
  },
  {
    path:'add',
    component:AddAutorisationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorisationRoutingModule { }
