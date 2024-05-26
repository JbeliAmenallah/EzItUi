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
  displayAddDialog: boolean = false; 
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
    this.selectedGrade = { ...grade }; 
    this.displayEditDialog = true;
  }

  saveEditedGrade(editedGrade: Grade) {
    if (editedGrade) {
      this.gradeService.updateGrade(editedGrade.grade_id, editedGrade).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Grade mis à jour avec succès' });
          this.displayEditDialog = false;
          this.getGrades(); 
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la note :', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de la grade' });
        }
      );
    }
  }

  hideEditDialog() {
    this.displayEditDialog = false;
  }

  deleteItem(grade_id: number) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette grade ??',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.gradeService.deleteGrade(grade_id).subscribe(
          () => {
            this.getGrades();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'La grade a été supprimée avec succès' });
          },
          (error) => {
            console.error('Error deleting grade:', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de la grade' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Vous avez rejeté' });
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
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Ajout réussi de la grade' });
        this.hideAddDialog();
        this.getGrades();
      },
      (error) => {
        console.error('Erreur lors de la création de la note:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la création de la grade' });
      }
    );
  }
}
