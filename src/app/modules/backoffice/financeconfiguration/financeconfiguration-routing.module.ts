import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceConfigurationListComponent } from './financeconfiguration-list/financeconfiguration-list.component';
import { FinanceconfigurationFormComponent } from './financeconfiguration-form/financeconfiguration-form.component';
import { FinanceconfigurationAddComponent } from './financeconfiguration-add/financeconfiguration-add.component';
import { FinanceConfigurationEditComponent } from './financeconfiguration-edit/financeconfiguration-edit.component';
const routes: Routes = [
  {
    path:'list',
    component:FinanceConfigurationListComponent
  },
  {
    path:'form',
    component:FinanceconfigurationFormComponent
  },
  {
    path:'add',
    component:FinanceconfigurationAddComponent
  },
  { path: 'edit/:id',
component: FinanceConfigurationEditComponent   },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceconfigurationRoutingModule { }
