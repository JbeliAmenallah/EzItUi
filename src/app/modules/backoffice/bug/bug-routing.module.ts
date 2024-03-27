import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugDetailsComponent } from './bug-details/bug-details.component';
import { EditBugComponent } from './edit-bug/edit-bug.component';
import { AddBugComponent } from './add-bug/add-bug.component';
import { BugListComponent } from './bug-list/bug-list.component';

const routes: Routes = [
  { path: '', component: BugListComponent },
  { path: 'add', component: AddBugComponent },
  { path: 'edit/:id', component: EditBugComponent },
  { path: 'details/:id', component: BugDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BugRoutingModule { }
