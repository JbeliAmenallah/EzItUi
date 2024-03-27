import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BugRoutingModule } from './bug-routing.module';
import { BugListComponent } from './bug-list/bug-list.component';
import { BugFormComponent } from './bug-form/bug-form.component';
import { AddBugComponent } from './add-bug/add-bug.component';
import { EditBugComponent } from './edit-bug/edit-bug.component';
import { BugDetailsComponent } from './bug-details/bug-details.component';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    BugListComponent,
    BugFormComponent,
    AddBugComponent,
    EditBugComponent,
    BugDetailsComponent
  ],
  imports: [
    CommonModule,
    BugRoutingModule,
    SharedModule
  ],
  providers: [
    ConfirmationService, 
    MessageService
    
  ]
})
export class BugModule { }
