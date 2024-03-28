import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorisationListComponent } from './autorisation-list/autorisation-list.component';

const routes: Routes = [
  {
    path:'',
    component:AutorisationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorisationRoutingModule { }
