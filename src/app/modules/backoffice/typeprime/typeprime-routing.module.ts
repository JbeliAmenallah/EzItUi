import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypePrimeListComponent } from './typeprime-list/typeprime-list.component';
import { TypePrimeFormComponent } from './typeprime-form/typeprime-form.component';
import { AddTypeprimeComponent } from './add-typeprime/add-typeprime.component';
import { EditTypePrimeComponent} from './edit-typeprime/edit-typeprime.component';

const routes: Routes = [

  {
    path:'list',
    component:TypePrimeListComponent
  },
  {
    path:'form',
    component:TypePrimeFormComponent
  },
  {
    path:'add',
    component:AddTypeprimeComponent
  },
  {
    path:'edit/:id',
    component:EditTypePrimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeprimeRoutingModule { }
