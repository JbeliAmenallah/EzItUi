import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deduction } from '../../../../shared/models/deduction';
import { DeductionService } from '../../../../core/http/deduction.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-deduction-list',
  templateUrl: './deduction-list.component.html',
  styleUrls: ['./deduction-list.component.css']
})
export class DeductionListComponent implements OnInit {

  deductions: Deduction[];
  loading: boolean = false;
  displayDialog: boolean = false;
  selectedDeduction: Deduction;

  constructor(
    private deductionService: DeductionService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllDeductions();
  }

  getAllDeductions(): void {
    this.loading = true;
    this.deductionService.getAllDeductions().subscribe(
      (deductions: Deduction[]) => {
        this.deductions = deductions;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de l’extraction des déductions :', error);
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible d’extraire les déductions' });
      }
    );
  }

  editItem(deduction: Deduction): void {
    this.router.navigate(['/deduction/edit/' + deduction.id], {
      state: { data: deduction }
    });
  }

  saveDeduction(): void {
    this.deductionService.updateDeduction(this.selectedDeduction.id, this.selectedDeduction).subscribe(
      () => {
        this.getAllDeductions();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Déduction mise à jour réussie' });
        this.hideDialog();
      },
      (error) => {
        console.error('Error updating deduction:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de la déduction' });
      }
    );
  }

  hideDialog(): void {
    this.displayDialog = false;
    this.selectedDeduction = null;
  }

  deleteItem(id: number): void {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette déduction ??',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.deductionService.deleteDeduction(id).subscribe(
          () => {
            this.getAllDeductions();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'La déduction a été supprimée avec succès' });
          },
          (error) => {
            console.error('Error deleting deduction:', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de la déduction' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Rejeté', detail: 'Suppression annulée' });
      }
    });
  }
}
