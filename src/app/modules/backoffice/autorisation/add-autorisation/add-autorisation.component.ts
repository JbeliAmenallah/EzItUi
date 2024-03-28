import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autorisation } from '../../../../shared/models/autorisation';
import { AutorisationService } from '../../../../core/http/autorisation.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-autorisation',
  templateUrl: './add-autorisation.component.html',
  styleUrls: ['./add-autorisation.component.css']
})
export class AddAutorisationComponent {
  form: FormGroup;
  messages: any[] = [];

  constructor(
    private fb: FormBuilder,
    private autorisationService: AutorisationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
      contactId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const autorisationData = this.prepareAutorisationData(this.form.value);

      this.autorisationService.saveAutorisation(autorisationData).subscribe(
        () => {
          this.router.navigate(['/autorisations']);
        },
        (error) => {
          console.error(error);
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Failed to save Autorisation.' }];
        }
      );
    } else {
      // Mark all fields as touched to display error messages
      this.form.markAllAsTouched();
    }
  }

  private prepareAutorisationData(formData: any): any {
    // Format startDate and endDate as LocalDateTime strings
    const dateDebut = new Date(formData.startDate);
    const dateFin = new Date(formData.endDate);

    return {
      dateDebut: this.formatLocalDateTime(dateDebut),
      dateFin: this.formatLocalDateTime(dateFin),
      contactId: formData.contactId,
      state: formData.state
    };
  }

  private formatLocalDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = this.padNumber(date.getMonth() + 1);
    const day = this.padNumber(date.getDate());
    const hours = this.padNumber(date.getHours());
    const minutes = this.padNumber(date.getMinutes());
    const seconds = this.padNumber(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  

  markAllAsTouched() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Function to get form controls for easier access in the template
  get f() {
    return this.form.controls;
  }
}
