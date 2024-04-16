import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorisationListComponent } from './autorisation-list/autorisation-list.component';
import { EditAutorisationComponent } from './edit-autorisation/edit-autorisation.component';
import { AddAutorisationComponent } from './add-autorisation/add-autorisation.component';
import { DemandeAutorisationComponent } from './demande-autorisation/demande-autorisation.component';
const routes: Routes = [
  {
    path:'list',
    component:AutorisationListComponent,
    
  },{
    path:'edit',
    component:EditAutorisationComponent
  },
  {
    path:'add',
    component:AddAutorisationComponent
  }
  ,
  {
    path:'demande',
    component:DemandeAutorisationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorisationRoutingModule { }
