import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeListComponent } from './grade-list/grade-list.component';
import { EditGradeComponent } from './edit-grade/edit-grade.component';
import { AddGradeComponent } from './add-grade/add-grade.component';
const routes: Routes = [
  {
    path:'list',
    component:GradeListComponent
  },
  {
    path:'edit',
    component:EditGradeComponent
  },{
    path:'add',
    component:AddGradeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
