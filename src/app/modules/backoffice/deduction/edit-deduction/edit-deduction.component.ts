import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deduction } from '../../../../shared/models/deduction';
import { DeductionService } from '../../../../core/http/deduction.service';
import { Message, MessageService } from 'primeng/api';
import { DeductionFormComponent } from '../deduction-form/deduction-form.component';

@Component({
  selector: 'app-edit-deduction',
  templateUrl: './edit-deduction.component.html',
  styleUrls: ['./edit-deduction.component.css']
})
export class EditDeductionComponent implements OnInit {
  @ViewChild('form') deductionFormComponent: DeductionFormComponent;
  @Input() deduction: Deduction;
  deductionForm: FormGroup;
  deductionId: any;
  messages: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private deductionService: DeductionService,
    private messageService: MessageService
  ) {
    if (this.route.snapshot.paramMap.get('id') !== undefined) {
      this.deductionId = this.route.snapshot.paramMap.get('id');
      this.getDeduction();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.deductionId = params['id'];
          this.getDeduction();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.deductionFormComponent = extrasState['data'];
          } else {
            this.router.navigate(['/deduction/list']);
          }
        }
      });
    }
  }




  ngOnInit(): void {
    this.getDeduction();
    this.messageService.messageObserver.subscribe((messages: Message[]) => {
      if (messages && Array.isArray(messages)) {
        this.messages = messages; // Update messages array
      } else {
        // If messages is not an array, handle it accordingly
        console.error('Received invalid messages:', messages);
        this.messages = []; // Reset messages array
      }
    });
  }

  getDeduction() {
    this.deductionService.getDeductionById(this.deductionId).subscribe({
      next: (deduction: Deduction) => {
        this.deduction = deduction;
        console.log(deduction);
      },
      error: (error) => {
        console.error("An error occurred while getting the deduction:", error);
      }
    });
  }

  update(): void {
    if (this.deductionFormComponent.formDeduction.valid) {
      const updatedDeduction = { ...this.deduction, ...this.deductionFormComponent.formDeduction.value };
      this.deductionService.updateDeduction(this.deductionId, updatedDeduction).subscribe(
        () => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The Deduction has been successfully added.' });
            setTimeout(() => {
                this.router.navigate(['/deduction/list']);
            }, 100); // Delay navigation by 1 second
        }, 10);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while updating the deduction.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}
