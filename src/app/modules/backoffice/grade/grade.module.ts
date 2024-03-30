import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeRoutingModule } from './grade-routing.module';
import { GradeListComponent } from './grade-list/grade-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { MessageService,ConfirmationService } from 'primeng/api';
import { EditGradeComponent } from './edit-grade/edit-grade.component';
import { AddGradeComponent } from './add-grade/add-grade.component';

@NgModule({
  declarations: [
    GradeListComponent,
    EditGradeComponent,
    AddGradeComponent
  ],
  imports: [
    CommonModule,
    GradeRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class GradeModule { }
