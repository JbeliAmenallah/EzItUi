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
  selectedCategory: Category;
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
  editCategory(category:Category) {
    // Set selectedGrade and display the EditGradeComponent
    this.selectedCategory = { ...category }; // Create a copy to avoid modifying original
    this.displayEditDialog = true;
  }
  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.categoryService.deleteCategory(id).subscribe(
          () => {
            this.getCategories();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Category deleted successfully' });
          },
          (error) => {
            console.error('Error deleting category:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting category' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  saveEditedCategory(editedCategory:Category) {
    if (editedCategory) {
      this.categoryService.updateCategory(editedCategory.id, editedCategory).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Grade updated successfully' });
          this.displayEditDialog = false;
          this.getCategories(); // Refresh the list
        },
        (error) => {
          console.error('Error updating grade:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating grade' });
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
    // Hide the EditGradeComponent dialog
    this.displayEditDialog = false;
  }

  saveNewCategory(newCategory: Category) {
    this.categoryService.createCategory(newCategory).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added successfully' });
        this.hideAddDialog();
        this.getCategories();
      },
      (error) => {
        console.error('Error creating category:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating category' });
      }
    );
  }
}
