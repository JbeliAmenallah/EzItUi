import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHolidayListComponent } from './holiday-list/holiday-list.component';
import { AddPublicHolidayComponent } from './add-publicholiday/add-publicholiday.component';

const routes: Routes = [
  {
    path:'list',
    component:PublicHolidayListComponent
  },
  {
    path:'add',
    component:AddPublicHolidayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicholidayRoutingModule { }
