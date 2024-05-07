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
        console.error('Erreur lors de l’extraction des configurations financières:', error);
        this.loading = false; 
      }
    );
  }


  saveFinanceConfig(): void {
    this.financeConfigService.updateFinanceConfiguration(this.selectedFinanceConfig.id, this.selectedFinanceConfig).subscribe(
      () => {
        this.getList(); 
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Configuration financière mise à jour avec succès' });
        this.hideDialog();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la configuration financière :', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de la configuration financière' });
      }
    );
  }

  hideDialog(): void {
    this.displayDialog = false;
    this.selectedFinanceConfig = null;
  }

  deleteItem(id: number): void {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette configuration financière ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.financeConfigService.deleteFinanceConfiguration(id).subscribe(
          () => {
            this.getList(); 
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Configuration financière supprimée avec succès' });
          },
          (error) => {
            console.error('Erreur lors de la suppression de la configuration financière :', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de la configuration financière' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Rejté', detail: 'Suppression annulée' });
      }
    });
  }

  editItem(id: number): void {
    this.router.navigate(['/financeconfiguration/edit', id]);
  }
}
