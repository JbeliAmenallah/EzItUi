import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';

const routes: Routes = [
  {
    path: "",
    component: ResourcesListComponent
  },
  {
    path: "add",
    component: AddResourceComponent
  },
  {
    path: 'edit/:id',
    component: EditResourceComponent
  },
   { path: 'details/:id', 
    component: ResourceDetailsComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
