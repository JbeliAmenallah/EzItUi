import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalityCriterionListComponent } from './functionality-criterion-list/functionality-criterion-list.component';
import { FunctionalityCriterionDetailsComponent } from './functionality-criterion-details/functionality-criterion-details.component';
import { EditFunctionalityCriterionComponent } from './edit-functionality-criterion/edit-functionality-criterion.component';
import { AddFunctionalityCriterionComponent } from './add-functionality-criterion/add-functionality-criterion.component';

const routes: Routes = [
  {path:"", component : FunctionalityCriterionListComponent},
  {path:"add", component : AddFunctionalityCriterionComponent},
  {path:"edit/:id", component : EditFunctionalityCriterionComponent},
  {path:"details/:id", component : FunctionalityCriterionDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionalityCriterionRoutingModule { }


