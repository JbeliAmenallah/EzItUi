import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStopwatchComponent } from './add-stopwatch/add-stopwatch.component';


const routes: Routes = [
 
  {
    path: "",
    component: AddStopwatchComponent
  }
 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopwatchRoutingModule { }
