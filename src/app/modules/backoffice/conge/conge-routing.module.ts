import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcongeComponent } from './addconge/addconge.component';

const routes: Routes = [{
  path:"add",
  component:AddcongeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongeRoutingModule { }
