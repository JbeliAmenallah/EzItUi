import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@NgModule({
  declarations: [
    ContactsListComponent,
    AddContactComponent,
    EditContactComponent,
    ContactFormComponent,
    ContactDetailsComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule ,
    ReactiveFormsModule,
    SharedModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,

  ],
  providers: [
    ConfirmationService, 
    MessageService 
  ]
})
export class ContactModule { 


  
}