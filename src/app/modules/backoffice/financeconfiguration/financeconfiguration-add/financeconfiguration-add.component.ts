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
    private router: Router
  ) {}

  save() {
    console.log("Inside save function");
    if (true) {
      const financeConfigurations = [
        this.financeForm.formCnss.value,
        this.financeForm.formDeduction.value,
        this.financeForm.formTva.value
      ];

      // Create each finance configuration
      financeConfigurations.forEach(config => {
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
