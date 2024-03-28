
import { AutorisationRoutingModule } from './autorisation-routing.module';
import { AutorisationListComponent } from './autorisation-list/autorisation-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api'; // Import ConfirmationService
import { MessageService } from 'primeng/api';
import { EditAutorisationComponent } from './edit-autorisation/edit-autorisation.component';
import { AddAutorisationComponent } from './add-autorisation/add-autorisation.component'; // Import MessageService

@NgModule({
  declarations: [
    AutorisationListComponent,
    EditAutorisationComponent,
    AddAutorisationComponent
  ],
  imports: [
    CommonModule,
    AutorisationRoutingModule,
    CommonModule,
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
export class AutorisationModule { }
