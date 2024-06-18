import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    AddPolicyComponent,
    PolicyListComponent,
  ],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class PoliciesModule { }
