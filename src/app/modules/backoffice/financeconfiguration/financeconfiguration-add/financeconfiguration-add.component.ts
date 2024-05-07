import { Component, ViewChild } from '@angular/core';
import { FinanceconfigurationFormComponent } from '../financeconfiguration-form/financeconfiguration-form.component';
import { FinanceConfigurationService } from '../../../../core/http/financeConfiguration.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FinanceConfiguration } from '../../../../shared/models/financeConfiguration';

@Component({
  selector: 'app-financeconfiguration-add',
  templateUrl: './financeconfiguration-add.component.html',
  styleUrls: ['./financeconfiguration-add.component.css']
})
export class FinanceconfigurationAddComponent {
  @ViewChild(FinanceconfigurationFormComponent) financeForm: FinanceconfigurationFormComponent;
  messages: any[] = [];
  financeConfiguration: FinanceConfiguration;


  constructor(
    private financeConfigService: FinanceConfigurationService,
    private messageService: MessageService,
    private router: Router,
    
  ) {}
  ngOnInit(): void {
    this.loadFinanceConfigurationOfCurrentOrPreviousYear();
  }

  loadFinanceConfigurationOfCurrentOrPreviousYear() {
    this.financeConfigService.getFinanceConfigurationOfCurrentOrPreviousYear().subscribe(
      (financeConfig: FinanceConfiguration) => {
        this.financeConfiguration = financeConfig;
        this.populateFormWithFinanceConfiguration();
      },
      (error) => {
        console.error('Error loading finance configuration:', error);
      }
    );
  }

  populateFormWithFinanceConfiguration() {
    if (this.financeConfiguration) {
      this.financeForm.formFinance.patchValue({
        anneeId: this.financeConfiguration.anneeId,
        cnss: this.financeConfiguration.cnss,
        css1: this.financeConfiguration.css1,
        css2: this.financeConfiguration.css2,
        css3: this.financeConfiguration.css3,
        css4: this.financeConfiguration.css4,
        css5: this.financeConfiguration.css5,
        tva: this.financeConfiguration.tva,
        deduction: this.financeConfiguration.deduction,
        irpp1: this.financeConfiguration.irpp1,
        irpp2: this.financeConfiguration.irpp2,
        irpp3: this.financeConfiguration.irpp3,
        irpp4: this.financeConfiguration.irpp4,
        irpp5: this.financeConfiguration.irpp5
      });
    }
  }
  save() {
    const selectedAnneeId: number = this.financeForm.formFinance.get('anneeId')?.value;
    if (selectedAnneeId) { 
      const financeConfiguration = {
        cnss: this.financeForm.formFinance.get('cnss')?.value,
        anneeId: selectedAnneeId,
        css1: this.financeForm.formFinance.get('css1')?.value,
        css2: this.financeForm.formFinance.get('css2')?.value,
        css3: this.financeForm.formFinance.get('css3')?.value,
        css4: this.financeForm.formFinance.get('css4')?.value,
        css5: this.financeForm.formFinance.get('css5')?.value,
        tva: this.financeForm.formFinance.get('tva')?.value,
        deduction: this.financeForm.formFinance.get('deduction')?.value,
        irpp1: this.financeForm.formFinance.get('irpp1')?.value,
        irpp2: this.financeForm.formFinance.get('irpp2')?.value,
        irpp3: this.financeForm.formFinance.get('irpp3')?.value,
        irpp4: this.financeForm.formFinance.get('irpp4')?.value,
        irpp5: this.financeForm.formFinance.get('irpp5')?.value
      };
  
      console.log('Finance Configuration Object:', financeConfiguration); 
  
      this.financeConfigService.createFinanceConfiguration(financeConfiguration).subscribe(
        () => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'La configuration financière a été ajoutée avec succès.' });
          }, 100);
          this.router.navigate(['/financeconfiguration/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de l’enregistrement de la configuration financière.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur de validation', detail: 'S’il vous plaît sélectionner une année.' });
    }
  }
  
}
