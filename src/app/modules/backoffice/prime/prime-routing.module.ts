import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeListComponent } from './prime-list/prime-list.component';
import { PrimeFormComponent } from './prime-form/prime-form.component';
import { AddPrimeComponent } from './add-prime/add-prime.component';
import { EditPrimeComponent } from './edit-prime/edit-prime.component';

const routes: Routes = [
  {
    path:'list',
    component:PrimeListComponent
  },  {
    path:'form',
    component:PrimeFormComponent
  },  {
    path:'add',
    component:AddPrimeComponent
  }, 
   { 
    path: 'edit/:id',
     component: EditPrimeComponent 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimeRoutingModule { }
