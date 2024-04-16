import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CongeRoutingModule } from './conge-routing.module';
import { AddcongeComponent } from './addconge/addconge.component';
import { CongeFormComponent } from './conge-form/conge-form.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CongeListComponent } from './conge-list/conge-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { EditCongeComponent } from './edit-conge/edit-conge.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api'; // Import ConfirmationService
import { MessageService } from 'primeng/api';
import { DemandeCongeComponent } from './demande-conge/demande-conge.component'; // Import MessageService


@NgModule({
  declarations: [
    AddcongeComponent,
    CongeFormComponent,
    CongeListComponent,
    EditCongeComponent,
    DemandeCongeComponent
  ],
  imports: [
    CommonModule,
    CongeRoutingModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    TableModule,
    ConfirmDialogModule,
    SharedModule,
    DialogModule,

  ],
  providers: [
    ConfirmationService,
    MessageService // Add ConfirmationService to providers
  ]
})
export class CongeModule { }
