import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CongeService } from '../../../../core/http/conge.service';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.css'],
  providers: [MessageService] // Provide the MessageService
})
export class DemandeCongeComponent {
  form: FormGroup;
  messages: any[] = []; // Define messages array

  constructor(
    private formBuilder: FormBuilder,
    private congeService: CongeService,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  submitLeaveRequest() {
    if (this.form.valid) {
      this.congeService.submitLeaveRequest(this.form.value).subscribe(
        (response) => {
          console.log('Leave request submitted successfully:', response);
          this.messages = [{severity:'success', summary:'Leave request submitted successfully', detail: 'State: ' + response.state}];
        },
        (error) => {
          console.error('Error submitting leave request:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
