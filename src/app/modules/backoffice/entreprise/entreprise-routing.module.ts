import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntreprisesListComponent } from './entreprise-list/entreprise-list.component';
import { EntrepriseFormComponent } from './entreprise-form/entreprise-form.component';
import { AddEntrepriseComponent } from './add-entreprise/add-entreprise.component';
import { EditEntrepriseComponent } from './edit-entreprise/edit-entreprise.component';
const routes: Routes = [
  {
    path:'list',
    component:EntreprisesListComponent
  },
  {
    path:'form',
    component:EntrepriseFormComponent
  },
  {
    path:'add',
    component:AddEntrepriseComponent
  },
  {
    path:'edit/:id',
    component:EditEntrepriseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
