import { Component, Input, OnInit } from '@angular/core';
import { Annee } from '../../../../shared/models/annee';
import { AnneeService } from '../../../../core/http/annee.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-annee-list',
  templateUrl: './annee-list.component.html',
  styleUrls: ['./annee-list.component.css']
})

export class AnneeListComponent implements OnInit {
  annees: Annee[] = [];
  loading: boolean = true;
  displayEditDialog: boolean = false;
  selectedAnnee: Annee;

  constructor(
    private anneeService: AnneeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAnnees();
  }

  getAnnees() {
    this.loading = true;
    this.anneeService.getAllAnnees().subscribe(
      (data) => {
        this.annees = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Erreur lors de la récupération des annees :', error);
      }
    );
  }

  editAnnee(annee: Annee) {
    this.selectedAnnee = { ...annee };
    // Convert 'dateDebutExercice' property to Date object if it's not already
    if (typeof this.selectedAnnee.dateDebutExercice === 'string') {
      this.selectedAnnee.dateDebutExercice = new Date(this.selectedAnnee.dateDebutExercice);
    }
    this.displayEditDialog = true;
  }

  saveEditedAnnee() {
    if (this.selectedAnnee) {
      this.anneeService.updateAnnee(this.selectedAnnee.id, this.selectedAnnee).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Année a été mise à jour avec succès' });
          this.displayEditDialog = false;
          this.getAnnees(); // Refresh the list
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l’année :', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour d’année' });
        }
      );
    }
  }

  hideEditDialog() {
    // Hide the EditAnneeComponent dialog
    this.displayEditDialog = false;
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette année ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.anneeService.deleteAnnee(id).subscribe(
          () => {
            this.getAnnees();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Année supprimée avec succès' });
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'année :', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de l\'année' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejetée', detail: 'Vous avez rejeté' });
      }
    });
  }
}
