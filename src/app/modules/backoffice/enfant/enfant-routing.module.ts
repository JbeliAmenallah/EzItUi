import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnfantListComponent } from './enfant-list/enfant-list.component';
import { EnfantFormComponent } from './enfant-form/enfant-form.component';
import { EnfantAddComponent } from './enfant-add/enfant-add.component';
import { EditEnfantComponent } from './enfant-edit/enfant-edit.component';
const routes: Routes = [
  {
    path:'list',
    component:EnfantListComponent
  },
  {
    path:'form',
    component:EnfantFormComponent
  },
  {
    path:'add',
    component:EnfantAddComponent
  },
  {
    path:'edit/:id',
    component:EditEnfantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnfantRoutingModule { }
