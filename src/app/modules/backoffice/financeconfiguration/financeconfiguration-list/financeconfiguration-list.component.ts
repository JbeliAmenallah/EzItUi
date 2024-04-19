import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceConfiguration } from '../../../../shared/models/financeConfiguration';
import { FinanceConfigurationService } from '../../../../core/http/financeConfiguration.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Console } from 'console';

@Component({
  selector: 'app-finance-configurations-list',
  templateUrl: './financeconfiguration-list.component.html',
  styleUrls: ['./financeconfiguration-list.component.css']
})
export class FinanceConfigurationListComponent implements OnInit {

  financeConfigurations: FinanceConfiguration[];
  loading: boolean = false;
  displayDialog: boolean = false;
  selectedFinanceConfig: FinanceConfiguration;

  constructor(
    private financeConfigService: FinanceConfigurationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  
  }

  getList(): void {
    this.loading = true; 
    this.financeConfigService.getAllFinanceConfigurations().subscribe(
      (items: FinanceConfiguration[]) => {
        this.financeConfigurations = items.reverse();
        this.loading = false; 
      },
      (error) => {
        console.error('Error fetching finance configurations:', error);
        this.loading = false; 
      }
    );
  }

  editItem(id: number): void {
    console.log('Editing item with id:', id); 
    this.financeConfigService.getFinanceConfigurationById(id).subscribe(
      (financeConfig: FinanceConfiguration) => {
        this.selectedFinanceConfig = { ...financeConfig };
        this.displayDialog = true;
        console.log(financeConfig); 

      },
      (error) => {
        console.error('Error fetching finance configuration:', error);
      }
    );
  }
  

  saveFinanceConfig(): void {
    this.financeConfigService.updateFinanceConfiguration(this.selectedFinanceConfig.id, this.selectedFinanceConfig).subscribe(
      () => {
        this.getList(); 
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Finance Configuration updated successfully' });
        this.hideDialog();
      },
      (error) => {
        console.error('Error updating finance configuration:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating finance configuration' });
      }
    );
  }

  hideDialog(): void {
    this.displayDialog = false;
    this.selectedFinanceConfig = null;
  }

  deleteItem(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this finance configuration?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.financeConfigService.deleteFinanceConfiguration(id).subscribe(
          () => {
            this.getList(); 
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Finance Configuration deleted successfully' });
          },
          (error) => {
            console.error('Error deleting finance configuration:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting finance configuration' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Deletion cancelled' });
      }
    });
  }

}
