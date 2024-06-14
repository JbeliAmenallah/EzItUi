import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutorisationService } from '../../../../core/http/autorisation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

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
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
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

      // Replace 'keycloakUserId' with the actual value or retrieve dynamically if needed
      const keycloakUserId = this.authService.getAuthenticatedUserId(); 

      this.autorisationService.submitAutorisationRequest({
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        keycloakUserId: keycloakUserId
      }).subscribe(
        (response) => {
          console.log('Received response:', response);
          console.log('Autorisation request submitted successfully:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Demande d autorisation soumise avec succès',
            detail: 'État: ' + response.state,
            life: 3000
          });
          setTimeout(() => {
            this.router.navigate(['/employee/conges']);
          }, 3000);
        },
        (error) => {
          console.error('Erreur lors de l’envoi de la demande d’autorisation :', error);
          this.messages = [{
            severity: 'error',
            summary: 'Erreur lors de l’envoi de la demande d’autorisation',
            detail: error.message || 'Erreur inconnue'
          }];
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
