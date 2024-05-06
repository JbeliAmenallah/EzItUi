import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../../../../core/http/absence.service';
import { Absence } from '../../../../shared/models/absence';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-absence-list',
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.css']
})
export class AbsenceListComponent implements OnInit {
  absences: Absence[] = [];
  loading: boolean = true;
  displayEditDialog: boolean = false;
  selectedAbsence: Absence;

  constructor(
    private absenceService: AbsenceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAbsences();
  }

  getAbsences() {
    this.loading = true;
    this.absenceService.getAllAbsences().subscribe(
      (data: Absence[]) => { // Specify the type of 'data' received
        this.absences = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Erreur lors de la récupération des absences :', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la récupération des absences' }); 
      }
    );
  }
  
  editAbsence(absence: Absence) {
    this.router.navigate(['absence/edit', absence.absenceId]);
  }
  

  saveEditedAbsence() {
    if (this.selectedAbsence) {
      this.absenceService.updateAbsence(this.selectedAbsence.absenceId, this.selectedAbsence).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Absence mise à jour avec succès' });
          this.displayEditDialog = false;
          this.getAbsences(); // Refresh the list
        },
        (error) => {
          console.error('Error updating absence:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de l’absence' });
        }
      );
    }
  }

  hideEditDialog() {
    // Hide the EditAbsenceComponent dialog
    this.displayEditDialog = false;
  }

  deleteItem(absenceId: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûre de vouloir supprimer cette absence ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.absenceService.deleteAbsence(absenceId).subscribe(
          () => {
            this.getAbsences();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'L’absence a été supprimée avec succès' });
          },
          (error) => {
            console.error('Error deleting absence:', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de l’absence' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Vous avez rejeté' });
      }
    });
  }
}
