import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmationService,MessageService } from 'primeng/api';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    EditCategoryComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class CategoryModule { }
