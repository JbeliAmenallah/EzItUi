import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KPIDashComponent } from './kpi-dash/kpi-dash.component';

const routes: Routes = [

  {
    path:'dash',
    component:KPIDashComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KPIRoutingModule { }
