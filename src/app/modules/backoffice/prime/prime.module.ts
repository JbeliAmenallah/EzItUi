import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeRoutingModule } from './prime-routing.module';
import { AddPrimeComponent } from './add-prime/add-prime.component';
import { PrimeFormComponent } from './prime-form/prime-form.component';
import { PrimeListComponent } from './prime-list/prime-list.component';
import { EditPrimeComponent } from './edit-prime/edit-prime.component';
import { MessageService,ConfirmationService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';



@NgModule({
  declarations: [
    AddPrimeComponent,
    PrimeFormComponent,
    PrimeListComponent,
    EditPrimeComponent
  ],
  imports: [
    CommonModule,
    PrimeRoutingModule,
      SharedModule,
      MultiSelectModule,
    
  ],
  providers:[
    MessageService,
    ConfirmationService,
  ],
  exports :[
    EditPrimeComponent
  ]
})
export class PrimeModule { }
