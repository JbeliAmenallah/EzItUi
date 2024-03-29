import { Component, OnInit } from '@angular/core';
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
        console.error('Error fetching annees:', error);
      }
    );
  }

  editAnnee(annee: Annee) {
    // Set selectedAnnee and display the EditAnneeComponent
    this.selectedAnnee = { ...annee }; // Create a copy to avoid modifying original
    this.displayEditDialog = true;
  }

  saveEditedAnnee() {
    if (this.selectedAnnee) {
      this.anneeService.updateAnnee(this.selectedAnnee.id, this.selectedAnnee).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Annee updated successfully' });
          this.displayEditDialog = false;
          this.getAnnees(); // Refresh the list
        },
        (error) => {
          console.error('Error updating annee:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating annee' });
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
      message: 'Are you sure you want to delete this annee?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.anneeService.deleteAnnee(id).subscribe(
          () => {
            this.getAnnees();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Annee deleted successfully' });
          },
          (error) => {
            console.error('Error deleting annee:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting annee' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
