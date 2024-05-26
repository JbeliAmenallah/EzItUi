import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateComponent } from './generate/generate.component';
import { SalaryListComponent } from './salary-list/salary-list.component';
const routes: Routes = [
  {
    path:'salary',
    component:GenerateComponent
  },
  {
    path:'list',
    component:SalaryListComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryRoutingModule { }
