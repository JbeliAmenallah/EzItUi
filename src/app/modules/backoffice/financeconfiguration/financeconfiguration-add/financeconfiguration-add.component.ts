import { Component, ViewChild } from '@angular/core';
import { FinanceconfigurationFormComponent } from '../financeconfiguration-form/financeconfiguration-form.component';
import { FinanceConfigurationService } from '../../../../core/http/financeConfiguration.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financeconfiguration-add',
  templateUrl: './financeconfiguration-add.component.html',
  styleUrls: ['./financeconfiguration-add.component.css']
})
export class FinanceconfigurationAddComponent {
  @ViewChild(FinanceconfigurationFormComponent) financeForm: FinanceconfigurationFormComponent;
  messages: any[] = [];


  constructor(
    private financeConfigService: FinanceConfigurationService,
    private messageService: MessageService,
    private router: Router,
    
  ) {}

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
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The finance configuration has been successfully added.' });
          }, 100);
          this.router.navigate(['/financeconfiguration/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the finance configuration.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please select an Annee.' });
    }
  }
  
}
