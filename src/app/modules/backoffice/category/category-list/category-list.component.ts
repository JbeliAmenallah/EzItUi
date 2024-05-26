import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../../core/http/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading: boolean = true;
  displayAddDialog: boolean = false;
  selectedCategory: Category | null = null; l
  displayEditDialog: boolean = false;



  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching categories:', error);
      }
    );
  }
  editCategory(category: Category) {
    this.selectedCategory = { ...category }; 
    this.displayEditDialog = true;
  }
  
 
  
  deleteItem(category_id: number) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette catégorie ??',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.categoryService.deleteCategory(category_id).subscribe(
          () => {
            this.getCategories();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Catégorie supprimée avec succès' });
          },
          (error) => {
            console.error('Error deleting category:', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de la catégorie' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Vous avez rejeté' });
      }
    });
  }
  saveEditedCategory(editedCategory:Category) {
    if (editedCategory) {
      this.categoryService.updateCategory(editedCategory.category_id, editedCategory).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie mis à jour avec succès' });
          this.displayEditDialog = false;
          this.getCategories(); 
        },
        (error) => {
          console.error('Error updating category:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de la catégorie' });
        }
      );
    }
  }
  showAddDialog() {
    this.displayAddDialog = true;
  }

  hideAddDialog() {
    this.displayAddDialog = false;
  }
  hideEditDialog() {
    this.displayEditDialog = false;
    this.selectedCategory = null;
  }

  saveNewCategory(newCategory: Category) {
    this.categoryService.createCategory(newCategory).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie ajoutée avec succès' });
        this.hideAddDialog();
        this.getCategories();
      },
      (error) => {
        console.error('Error creating category:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la création de la catégorie' });
      }
    );
  }
}
