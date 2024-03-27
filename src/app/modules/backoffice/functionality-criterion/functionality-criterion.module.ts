import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionalityCriterionRoutingModule } from './functionality-criterion-routing.module';
import { FunctionalityCriterionListComponent } from './functionality-criterion-list/functionality-criterion-list.component';
import { AddFunctionalityCriterionComponent } from './add-functionality-criterion/add-functionality-criterion.component';
import { EditFunctionalityCriterionComponent } from './edit-functionality-criterion/edit-functionality-criterion.component';
import { FunctionalityCriterionFormComponent } from './functionality-criterion-form/functionality-criterion-form.component';
import { FunctionalityCriterionDetailsComponent } from './functionality-criterion-details/functionality-criterion-details.component';
import { SharedModule } from '../../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    FunctionalityCriterionListComponent,
    AddFunctionalityCriterionComponent,
    EditFunctionalityCriterionComponent,
    FunctionalityCriterionFormComponent,
    FunctionalityCriterionDetailsComponent
  ],
  imports: [
    CommonModule,
    FunctionalityCriterionRoutingModule,
    SharedModule,MultiSelectModule ,
    CardModule,TableModule,
    DropdownModule,
    TagModule,
    InputTextModule,
    TooltipModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService, 
    MessageService
    
  ]
})
export class FunctionalityCriterionModule { }
