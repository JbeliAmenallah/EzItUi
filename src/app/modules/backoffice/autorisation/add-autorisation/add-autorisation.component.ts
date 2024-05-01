import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autorisation } from '../../../../shared/models/autorisation';
import { AutorisationService } from '../../../../core/http/autorisation.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AbsenceService } from '../../../../core/http/absence.service';

@Component({
  selector: 'app-add-autorisation',
  templateUrl: './add-autorisation.component.html',
  styleUrls: ['./add-autorisation.component.css']
})
export class AddAutorisationComponent {
  form: FormGroup;
  messages: any[] = [];
  employeeOptions: any[] = []; // Array to store employee options

  constructor(
    private fb: FormBuilder,
    private autorisationService: AutorisationService,
    private router: Router,
    private absenceService: AbsenceService
  ) {
    this.loadEmployeeOptions();
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
      contactId: ['', Validators.required]
    });
  }

  loadEmployeeOptions() {
    this.absenceService.getEmployeeOptions().subscribe(options => {
      this.employeeOptions = options;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const autorisationData = this.prepareAutorisationData(this.form.value);

      if (true) {
    
        this.autorisationService.saveAutorisation(autorisationData).subscribe(
          () => {
            console.log(autorisationData)
            this.router.navigate(['/autorisations/list']);
          },
          (error) => {
            console.error(error);
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'Failed to save Autorisation.' }];
          }
        );
      } else {
        console.error("Selected employee is invalid or does not have a contactId property.");
        // Optionally, you can show a message to the user indicating that an invalid employee was selected.
      }
    } else {
      // Mark all fields as touched to display error messages
      this.form.markAllAsTouched();
    }
  }
  
  

  private prepareAutorisationData(formData: any): any {
    console.log('Form Data:', formData);
    console.log('Employee Options:', this.employeeOptions);
  
    // Format startDate and endDate as LocalDateTime strings
    const dateDebut = new Date(formData.startDate);
    const dateFin = new Date(formData.endDate);
  
    // Access the value property of the contactId object
    const contactId = formData.contactId.value;
    console.log(contactId)
    return {
      dateDebut: this.formatLocalDateTime(dateDebut),
      dateFin: this.formatLocalDateTime(dateFin),
      contactId: contactId,
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
