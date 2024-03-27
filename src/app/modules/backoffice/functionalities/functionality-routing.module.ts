import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalitysListComponent } from './functionalitys-list/functionalitys-list.component';
import { AddFunctionalityComponent } from './add-functionality/add-functionality.component';
import { EditFunctionalityComponent } from './edit-functionality/edit-functionality.component';
import { FunctionalityDetailsComponent } from './functionality-details/functionality-details.component'; 
const routes: Routes = [
  {
    path: "",
    component:  FunctionalitysListComponent
  },
  {
    path: "add",
    component: AddFunctionalityComponent
  },
  {
    path: 'edit/:id',
    component: EditFunctionalityComponent
  },
  {
    path: 'details/:id', 
   component: FunctionalityDetailsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionalityRoutingModule { }
