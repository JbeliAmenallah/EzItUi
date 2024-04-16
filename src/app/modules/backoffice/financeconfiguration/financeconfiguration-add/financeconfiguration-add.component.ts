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
    console.log("Inside save function");
    if (true) { 
      const cssConfigurations = [
        {
          libele: 'CSS : Salary under 5000:',
          year: this.financeForm.formCss.get('year').value,
          cssValue0: this.financeForm.formCss.get('cssValue0').value,
          anneeId: this.financeForm.formCss.get('anneeId').value,
          taux: this.financeForm.formCss.get('cssValue0') ? this.financeForm.formCss.get('cssValue0').value : null,
        },
        {
          libele: 'CSS : Salary between 5000-20000:',
          year: this.financeForm.formCss.get('year').value,
          cssValue1: this.financeForm.formCss.get('cssValue1').value,
          anneeId: this.financeForm.formCss.get('anneeId').value,
          taux: this.financeForm.formCss.get('cssValue1') ? this.financeForm.formCss.get('cssValue1').value : null,
        },
        {
          libele: 'CSS : Salary between 20000-30000:',
          year: this.financeForm.formCss.get('year').value,
          cssValue2: this.financeForm.formCss.get('cssValue2').value,
          anneeId: this.financeForm.formCss.get('anneeId').value,
          taux: this.financeForm.formCss.get('cssValue2') ? this.financeForm.formCss.get('cssValue2').value : null,
        },
        {
          libele: 'CSS : Salary between 30000-50000:',
          year: this.financeForm.formCss.get('year').value,
          cssValue3: this.financeForm.formCss.get('cssValue3').value,
          anneeId: this.financeForm.formCss.get('anneeId').value,
          taux: this.financeForm.formCss.get('cssValue3') ? this.financeForm.formCss.get('cssValue3').value : null,
        },
        {
          libele: 'CSS : Salary over 50000:',
          year: this.financeForm.formCss.get('year').value,
          cssValue4: this.financeForm.formCss.get('cssValue4').value,
          anneeId: this.financeForm.formCss.get('anneeId').value,
          taux: this.financeForm.formCss.get('cssValue4') ? this.financeForm.formCss.get('cssValue4').value : null,
        }
      ];
  
      const erppConfigurations = [
        {
          libele: 'ERPP : Salary under 5000:',
          year: this.financeForm.formErpp.get('year').value,
          erppValue0: this.financeForm.formErpp.get('erppValue0').value,
          anneeId: this.financeForm.formErpp.get('anneeId').value,
          taux: this.financeForm.formErpp.get('erppValue0') ? this.financeForm.formErpp.get('erppValue0').value : null,
        },
        {
          libele: 'ERPP : Salary between 5000-20000:',
          year: this.financeForm.formErpp.get('year').value,
          erppValue1: this.financeForm.formErpp.get('erppValue1').value,
          anneeId: this.financeForm.formErpp.get('anneeId').value,
          taux: this.financeForm.formErpp.get('erppValue1') ? this.financeForm.formErpp.get('erppValue1').value : null,
        },
        {
          libele: 'ERPP : Salary between 20000-30000:',
          year: this.financeForm.formErpp.get('year').value,
          erppValue2: this.financeForm.formErpp.get('erppValue2').value,
          anneeId: this.financeForm.formErpp.get('anneeId').value,
          taux: this.financeForm.formErpp.get('erppValue2') ? this.financeForm.formErpp.get('erppValue2').value : null,
        },
        {
          libele: 'ERPP : Salary between 30000-50000:',
          year: this.financeForm.formErpp.get('year').value,
          erppValue3: this.financeForm.formErpp.get('erppValue3').value,
          anneeId: this.financeForm.formErpp.get('anneeId').value,
          taux: this.financeForm.formErpp.get('erppValue3') ? this.financeForm.formErpp.get('erppValue3').value : null,
        },
        {
          libele: 'ERPP : Salary over 50000:',
          year: this.financeForm.formErpp.get('year').value,
          erppValue4: this.financeForm.formErpp.get('erppValue4').value,
          anneeId: this.financeForm.formErpp.get('anneeId').value,
          taux: this.financeForm.formErpp.get('erppValue4') ? this.financeForm.formErpp.get('erppValue4').value : null,
        }
      ];
  
      // Merge CSS and ERPP configurations
      const allConfigurations = [...cssConfigurations, ...erppConfigurations];
  
      // Create each configuration
      allConfigurations.forEach(config => {
        this.financeConfigService.createFinanceConfiguration(config).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The Config has been successfully added.' });
            // Optionally handle navigation after all configurations are saved
            this.router.navigate(['/financeconfiguration/list']);
          },
          (error) => {
            console.error('Error adding Finance Configuration:', error);
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'An error occurred while adding Finance Configuration.' }];
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while adding Finance Configuration.' });
          }
        );
      });
    } else {
      console.error('Form is invalid');
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Please fill all required fields correctly.' }];
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields correctly.' });
    }
  }
  
  
  
  
  
}
