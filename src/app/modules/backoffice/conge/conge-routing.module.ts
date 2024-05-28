import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcongeComponent } from './addconge/addconge.component';
import { CongeListComponent } from './conge-list/conge-list.component';
import { DemandeCongeComponent } from './demande-conge/demande-conge.component';
import { EditCongeComponent } from './edit-conge/edit-conge.component';
import { CongeFormComponent } from './conge-form/conge-form.component';

const routes: Routes = [{
  path:"add",
  component:AddcongeComponent
},
{
  path:"list",
  component:CongeListComponent
},
{
  path:"demande",
  component:DemandeCongeComponent
}, 
 { path: 'edit/:id',
  component: EditCongeComponent
 },
 {path:'form',component:CongeFormComponent
 }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongeRoutingModule { }
