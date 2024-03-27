import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { Message, MessageService } from 'primeng/api';
import { FunctionalityCriterionFormComponent } from '../functionality-criterion-form/functionality-criterion-form.component';
import { FunctionalityCriterion } from '../../../../shared/models/functionalityCriterion';
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/auth/Functionality.service';
import { FunctionalityCriterionService } from '../../../../core/auth/functionalityCriterion.service';

@Component({
  selector: 'app-add-functionality-criterion',
  templateUrl: './add-functionality-criterion.component.html',
  styleUrls: ['./add-functionality-criterion.component.css'] // Correction : changer 'styleUrl' en 'styleUrls'
})
export class AddFunctionalityCriterionComponent implements OnInit {
  @ViewChild('form') functionalityCriterionForm: FunctionalityCriterionFormComponent;
  messages: Message[] = [];
  private functionalityCriterion: FunctionalityCriterion;
  currentFunctionality: Functionality;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private serviceFunctionality: FunctionalityService,
    private serviceFunctionalityCriterion: FunctionalityCriterionService
  ) {}

  ngOnInit(): void {
    this.functionalityCriterion = {
      description: '',
      functionalityId: null
    };
  }

  save(): void {
    if (this.functionalityCriterionForm.form.valid) {
      this.functionalityCriterion.description = this.functionalityCriterionForm.form.get('description')?.value;
      this.functionalityCriterion.functionalityId = parseInt(this.functionalityCriterionForm.form.get('functionalityId')?.value);

      this.serviceFunctionalityCriterion.create(this.functionalityCriterion).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The functionality validation criterion has been successfully added.' });
          }, 300);
          this.router.navigate(['/functionalityCriterion']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the functionality validation criterion.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
    }
}

}
