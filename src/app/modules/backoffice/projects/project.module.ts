import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProjectRoutingModule } from './project-routing.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';


@NgModule({
  declarations: [
    AddProjectComponent,
    EditProjectComponent,
    ProjectFormComponent,
    ProjectsListComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    SharedModule  ,
    ConfirmDialogModule,
    ToastModule,
    KeyFilterModule,
    InputTextModule,
    SpeedDialModule,
		ToolbarModule,
		RippleModule,
		SplitButtonModule,
		AccordionModule,
		TabViewModule,
		FieldsetModule,
		MenuModule,
		DividerModule,
		SplitterModule,
		PanelModule

  ]
  ,
  providers: [
    ConfirmationService, 
    MessageService 
    
  ]
})
export class ProjectModule {}
