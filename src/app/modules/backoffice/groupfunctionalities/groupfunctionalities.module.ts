import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupfunctionalitiesRoutingModule } from './groupfunctionalities-routing.module';
import { AddGroupFunctionalityComponent } from './add-groupfunctionalities/add-groupfunctionality.component';
import { EditGroupfunctionalityComponent } from './edit-groupfunctionalites/edit-groupfunctionality.component';
import { GroupfunctionalityListComponent } from './groupfunctionalities-list/groupfunctionality-list.component';
import { GroupFunctionalityFormComponent } from './groupfunctionalities-form/groupfunctionality-form.component';
import { GroupfunctionalityDetailsComponent } from './groupfunctionalities-details/groupfunctionality-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AddGroupFunctionalityComponent,
    EditGroupfunctionalityComponent,
    GroupfunctionalityListComponent,
    GroupFunctionalityFormComponent,
    GroupfunctionalityDetailsComponent
  ],
  imports: [
    CommonModule,
    GroupfunctionalitiesRoutingModule,
    ReactiveFormsModule,
    CalendarModule, 
    DropdownModule, 
    ButtonModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    TableModule,
    MessagesModule
  ],
  providers: [
    ConfirmationService, 
    MessageService 
  ]
})
export class GroupfunctionalitiesModule { }
