
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
import { ConfirmationService } from 'primeng/api'; 
import { MessageService } from 'primeng/api';
import { EditAutorisationComponent } from './edit-autorisation/edit-autorisation.component';
import { AddAutorisationComponent } from './add-autorisation/add-autorisation.component';
import { DemandeAutorisationComponent } from './demande-autorisation/demande-autorisation.component';
import { UsersessionComponent } from './usersession/usersession.component'; 

@NgModule({
  declarations: [
    AutorisationListComponent,
    EditAutorisationComponent,
    AddAutorisationComponent,
    DemandeAutorisationComponent,
    UsersessionComponent
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
    MessageService,
  ]
})
export class AutorisationModule { }
