import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CongeService } from '../../../../core/http/conge.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.css'],
})
export class DemandeCongeComponent implements OnInit {
  form: FormGroup;
  messages: any[] = [];
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private congeService: CongeService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userId = this.authService.getAuthenticatedUserId();
  }

  submitLeaveRequest() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        keycloakUserId: this.userId
      };
      this.congeService.submitLeaveRequest(formData).subscribe(
        (response) => {
          console.log('Leave request submitted successfully:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Demande de congé soumise avec succès',
            detail: 'État: ' + response.state,
            life: 3000
          });
          setTimeout(() => {
            this.router.navigate(['/employee/conges']);
          }, 3000);
        },
        (error) => {
          console.error('Erreur lors de l’envoi de la demande de congé :', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de l’envoi de la demande de congé',
            life: 3000
          });
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
