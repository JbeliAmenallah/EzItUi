import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutorisationService } from '../../../../core/http/autorisation.service';

@Component({
  selector: 'app-demande-autorisation',
  templateUrl: './demande-autorisation.component.html',
  styleUrls: ['./demande-autorisation.component.css'],
  providers: [MessageService] 
})
export class DemandeAutorisationComponent {
  form: FormGroup;
  messages: any[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private autorisationService: AutorisationService,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  submitAutorisationRequest() {
    console.log('Submitting autorisation request...');
    this.markFormGroupTouched(this.form);
  
    if (this.form.valid) {
        console.log('Form is valid. Making HTTP request...');
        this.autorisationService.submitAutorisationRequest(this.form.value).subscribe(
            (response) => {
                console.log('Received response:', response);
                console.log('Autorisation request submitted successfully:', response);
                this.messages = [{severity:'success', summary:'Autorisation request submitted successfully', detail: 'State: ' + response.state}];
            },
            (error) => {
                console.error('Error submitting autorisation request:', error);
                this.messages = [{severity:'error', summary:'Error submitting autorisation request', detail: error.message || 'Unknown error'}];
            }
        );
    } else {
        console.log('Form is not valid.');
    }
}


markFormGroupTouched(formGroup: FormGroup) {
    console.log('Marking form group as touched...');
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control instanceof FormGroup) {
            this.markFormGroupTouched(control);
        }
    });
}

}
