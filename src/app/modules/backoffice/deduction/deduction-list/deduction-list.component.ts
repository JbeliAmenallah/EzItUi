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
        console.error('Error fetching deductions:', error);
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch deductions' });
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
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deduction updated successfully' });
        this.hideDialog();
      },
      (error) => {
        console.error('Error updating deduction:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating deduction' });
      }
    );
  }

  hideDialog(): void {
    this.displayDialog = false;
    this.selectedDeduction = null;
  }

  deleteItem(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this deduction?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.deductionService.deleteDeduction(id).subscribe(
          () => {
            this.getAllDeductions();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Deduction deleted successfully' });
          },
          (error) => {
            console.error('Error deleting deduction:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting deduction' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Deletion cancelled' });
      }
    });
  }
}
