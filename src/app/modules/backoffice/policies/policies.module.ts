import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AddPolicyComponent,
    PolicyListComponent
  ],
  imports: [
    CommonModule,
    PoliciesRoutingModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class PoliciesModule { }
