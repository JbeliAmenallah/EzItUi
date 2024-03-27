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

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddcongeComponent,
    CongeFormComponent
    

  ],
  imports: [
    CommonModule,
    CongeRoutingModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule
  ]
})
export class CongeModule { }
