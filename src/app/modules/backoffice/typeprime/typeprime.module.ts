import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';
import { TypeprimeRoutingModule } from './typeprime-routing.module';
import { TypePrimeListComponent } from './typeprime-list/typeprime-list.component';
import { TypePrimeFormComponent } from './typeprime-form/typeprime-form.component';
import { AddTypeprimeComponent } from './add-typeprime/add-typeprime.component';
import { EditTypePrimeComponent} from './edit-typeprime/edit-typeprime.component';

@NgModule({
  declarations: [
    TypePrimeListComponent,
    TypePrimeFormComponent,
    AddTypeprimeComponent,
    EditTypePrimeComponent,
    
  ],
  imports: [
    CommonModule,
    TypeprimeRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class TypeprimeModule { }
