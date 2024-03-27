import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupfunctionalityListComponent } from './groupfunctionalities-list/groupfunctionality-list.component';
import { AddFunctionalityComponent } from '../functionalities/add-functionality/add-functionality.component';
import { EditFunctionalityComponent } from '../functionalities/edit-functionality/edit-functionality.component';
import { GroupfunctionalityDetailsComponent } from './groupfunctionalities-details/groupfunctionality-details.component';
import { AddGroupFunctionalityComponent } from './add-groupfunctionalities/add-groupfunctionality.component';
import { EditGroupfunctionalityComponent } from './edit-groupfunctionalites/edit-groupfunctionality.component';

  const routes: Routes = [
    {
      path: '',
      component: GroupfunctionalityListComponent
    },
    {
      path: 'add',
      component: AddGroupFunctionalityComponent 
    },
    {
      path: 'edit/:id',
      component: EditGroupfunctionalityComponent
    },
    { path: 'details/:id', 
    component: GroupfunctionalityDetailsComponent
   },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class GroupfunctionalitiesRoutingModule { }
