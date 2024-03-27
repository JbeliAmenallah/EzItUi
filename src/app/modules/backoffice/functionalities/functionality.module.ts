import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FunctionalityRoutingModule } from './functionality-routing.module';
import { FunctionalitysListComponent } from './functionalitys-list/functionalitys-list.component';
import { AddFunctionalityComponent } from './add-functionality/add-functionality.component';
import { EditFunctionalityComponent } from './edit-functionality/edit-functionality.component';
import { FunctionalityFormComponent } from './functionality-form/functionality-form.component';
import { FunctionalityDetailsComponent } from './functionality-details/functionality-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../../shared/shared.module';
import { ScrollTopModule } from 'primeng/scrolltop';

@NgModule({
  declarations: [
    FunctionalitysListComponent,
    AddFunctionalityComponent,
    EditFunctionalityComponent,
    FunctionalityFormComponent,
    FunctionalityDetailsComponent,
  ],
  imports: [
    CommonModule,
    FunctionalityRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    ScrollTopModule,
  ],
  providers: [
    ConfirmationService, 
    MessageService,
    DatePipe,
  ]
})
export class FunctionalityModule { }
