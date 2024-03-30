import { Component, OnInit } from '@angular/core';
import { Grade } from '../../../../shared/models/grade';
import { GradeService } from '../../../../core/http/grade.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent implements OnInit {
  grades: Grade[] = [];
  loading: boolean = true;
  displayEditDialog: boolean = false;
  displayAddDialog: boolean = false; // Add this line
  selectedGrade: Grade;

  constructor(
    private gradeService: GradeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getGrades();
  }

  getGrades() {
    this.loading = true;
    this.gradeService.getAllGrades().subscribe(
      (data) => {
        this.grades = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching grades:', error);
      }
    );
  }

  editGrade(grade: Grade) {
    // Set selectedGrade and display the EditGradeComponent
    this.selectedGrade = { ...grade }; // Create a copy to avoid modifying original
    this.displayEditDialog = true;
  }

  saveEditedGrade(editedGrade: Grade) {
    if (editedGrade) {
      this.gradeService.updateGrade(editedGrade.id, editedGrade).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Grade updated successfully' });
          this.displayEditDialog = false;
          this.getGrades(); // Refresh the list
        },
        (error) => {
          console.error('Error updating grade:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating grade' });
        }
      );
    }
  }

  hideEditDialog() {
    // Hide the EditGradeComponent dialog
    this.displayEditDialog = false;
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this grade?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.gradeService.deleteGrade(id).subscribe(
          () => {
            this.getGrades();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Grade deleted successfully' });
          },
          (error) => {
            console.error('Error deleting grade:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting grade' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
    console.log("in showadd dialog")
  }

  hideAddDialog() {
    this.displayAddDialog = false;
  }

  saveNewGrade(newGrade: Grade) {
    this.gradeService.createGrade(newGrade).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Grade added successfully' });
        this.hideAddDialog();
        this.getGrades();
      },
      (error) => {
        console.error('Error creating grade:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating grade' });
      }
    );
  }
}
