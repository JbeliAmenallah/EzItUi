import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ajout de FormsModule et ReactiveFormsModule

import { ResourceRoutingModule } from './resource-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';

@NgModule({
  declarations: [
    ResourcesListComponent,
    AddResourceComponent,
    EditResourceComponent,
    ResourceFormComponent,
    ResourceDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Ajout de FormsModule
    ReactiveFormsModule,
    SharedModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CalendarModule,
    ResourceRoutingModule // Déplacement de ResourceRoutingModule ici
  ],
  providers: [
    ConfirmationService, 
    MessageService 
  ]
})
export class ResourceModule { }
