import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutorisationService } from '../../../../core/http/autorisation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-autorisation',
  templateUrl: './demande-autorisation.component.html',
  styleUrls: ['./demande-autorisation.component.css'],
  providers: [MessageService] 
})
export class DemandeAutorisationComponent {
  form: FormGroup;
  messages: any[] = []; 
  router: Router;

  constructor(
    private formBuilder: FormBuilder,
    private autorisationService: AutorisationService,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
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
                this.messages = [{severity:'success', summary:'Demande d’autorisation soumise avec succès', detail: 'State: ' + response.state}];
                this.router.navigate(['/autorisations/list']);
            },
            (error) => {
                console.error('Erreur lors de l’envoi de la demande d’autorisation :', error);
                this.messages = [{severity:'error', summary:'Erreur lors de l’envoi de la demande d’autorisation', detail: error.message || 'Erreur inconnue'}];
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
