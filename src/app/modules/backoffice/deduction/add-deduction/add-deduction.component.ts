import { Component, ViewChild } from '@angular/core';
import { DeductionFormComponent } from '../deduction-form/deduction-form.component';
import { DeductionService } from '../../../../core/http/deduction.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Deduction } from '../../../../shared/models/deduction';

@Component({
  selector: 'app-add-deduction',
  templateUrl: './add-deduction.component.html',
  styleUrls: ['./add-deduction.component.css']
})
export class AddDeductionComponent {
  @ViewChild(DeductionFormComponent) deductionForm: DeductionFormComponent;
  messages: any[] = [];
  deduction: Deduction;

  constructor(
    private deductionService: DeductionService,
    private messageService: MessageService,
    private router: Router
  ) {}

  save() {
    if (this.deductionForm.formDeduction.valid) {
      const newDeduction = this.deductionForm.formDeduction.value;
      console.log('New Deduction Object:', newDeduction);

      this.deductionService.createDeduction(newDeduction).subscribe(
        () => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The deduction has been successfully added.' });
          }, 100);
          this.router.navigate(['/deduction/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the deduction.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all the required fields.' });
    }
  }
}
