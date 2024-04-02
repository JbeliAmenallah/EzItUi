import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService,ConfirmationService } from 'primeng/api';
import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { EntreprisesListComponent } from './entreprise-list/entreprise-list.component';
import { EntrepriseFormComponent } from './entreprise-form/entreprise-form.component';
import { AddEntrepriseComponent } from './add-entreprise/add-entreprise.component';
import { EditEntrepriseComponent } from './edit-entreprise/edit-entreprise.component';
@NgModule({
  declarations: [
    EntreprisesListComponent,
    EntrepriseFormComponent,
    AddEntrepriseComponent,
    EditEntrepriseComponent
  ],
  imports: [
    CommonModule,
    EntrepriseRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class EntrepriseModule { }
