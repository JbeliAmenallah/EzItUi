import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupeRoutingModule } from './groupe-routing.module';
import { GroupeListComponent } from './groupe-list/groupe-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { MessageService,ConfirmationService } from 'primeng/api';
import { AddGroupeComponent } from './add-groupe/add-groupe.component';
import { EditGroupeComponent } from './edit-groupe/edit-groupe.component';

@NgModule({
  declarations: [
    GroupeListComponent,
    AddGroupeComponent,
    EditGroupeComponent
  ],
  imports: [
    CommonModule,
    GroupeRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class GroupeModule { }
