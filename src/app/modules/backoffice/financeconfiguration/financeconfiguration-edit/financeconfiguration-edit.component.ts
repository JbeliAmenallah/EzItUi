import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinanceConfiguration } from '../../../../shared/models/financeConfiguration';
import { Message } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import FormGroup and FormBuilder

@Component({
  selector: 'app-financeconfiguration-edit',
  templateUrl: './financeconfiguration-edit.component.html',
  styleUrls: ['./financeconfiguration-edit.component.css']
})
export class FinanceconfigurationEditComponent {
  formFinance: FormGroup; // Define formFinance property

  @Input() displayDialog: boolean;
  @Input() selectedFinanceConfig: FinanceConfiguration;
  @Output() onSave: EventEmitter<FinanceConfiguration> = new EventEmitter<FinanceConfiguration>();
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

  messages: Message[] = [];

  constructor(private formBuilder: FormBuilder) { // Inject FormBuilder in constructor
    this.formFinance = this.createForm(); // Initialize formFinance in the constructor
  }

  // Method to create the form
  createForm(): FormGroup {
    return this.formBuilder.group({
      // Define your form controls with their initial values and validators here
      anneeId: [null, Validators.required],
      cnss: [null, Validators.compose([Validators.required, Validators.min(0)])],
      // Add other form controls here
    });
  }

  save() {
    this.onSave.emit(this.selectedFinanceConfig);
    console.log(this.selectedFinanceConfig);
  }

  hideDialog() {
    this.onHide.emit();
  }
}
