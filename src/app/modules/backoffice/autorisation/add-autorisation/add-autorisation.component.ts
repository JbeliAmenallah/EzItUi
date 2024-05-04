import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autorisation } from '../../../../shared/models/autorisation';
import { AutorisationService } from '../../../../core/http/autorisation.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AbsenceService } from '../../../../core/http/absence.service';
import { DialogModule } from 'primeng/dialog';
import { Message, MessageService } from 'primeng/api';

@Component({
selector: 'app-add-autorisation',
templateUrl: './add-autorisation.component.html',
styleUrls: ['./add-autorisation.component.css'],
providers: [MessageService] 

})
export class AddAutorisationComponent {
form: FormGroup;
displayConfirmation: boolean = false; 

messages: Message[] = [];
employeeOptions: any[] = [];
displayDialog: boolean = false;
stateOptions = [
{ label: 'Accepted', value: 'Accepted' },
{ label: 'Pending', value: 'Pending' },
{ label: 'Rejected', value: 'Rejected' }
];
constructor(
private fb: FormBuilder,
private autorisationService: AutorisationService,
private router: Router,
private absenceService: AbsenceService,
private messageService: MessageService ,

) {
this.loadEmployeeOptions();
this.form = this.fb.group({
startDate: ['', Validators.required],
endDate: ['', Validators.required],
state: ['', Validators.required],
contactId: ['', Validators.required]
});
}


ngOnInit(): void {
    this.loadEmployeeOptions();
    this.initStateOptions();
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
      contactId: ['', Validators.required]
    });
  
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
  

initStateOptions() {
if (this.stateOptions.length === 0) {
this.stateOptions = [
{ label: 'Accepted', value: 'Accepted' },
{ label: 'Pending', value: 'Pending' },
{ label: 'Rejected', value: 'Rejected' }
];
}
}

loadEmployeeOptions() {
this.absenceService.getEmployeeOptions().subscribe(options => {
this.employeeOptions = options;
});
}

onSubmit() {
  console.log('Form:', this.form.value);

  if (this.form.valid) {
    const autorisationData = this.prepareAutorisationData(this.form.value);

    console.log('Autorisation Data:', autorisationData);

    this.autorisationService.saveAutorisation(autorisationData).subscribe(
      () => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The Autorisation has been successfully added.' });
          setTimeout(() => {
              this.router.navigate(['/autorisations/list']);
          }, 100); 
      }, 10);
      },
      (error) => {
        console.error('Error saving autorisation:', error);
        if (error.status === 400) {
          const validationErrors = error.error;
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: validationErrors[key] });
            }
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Autorisation.' });
        }
      }
    );
  } else {
    console.log('Form is invalid');
    this.form.markAllAsTouched();
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill out all required fields.' });
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
console.log(contactId);

// Get the selected state value as a string
const state = formData.state.value; // Assuming the value property holds the selected state string

return {
dateDebut: this.formatLocalDateTime(dateDebut),
dateFin: this.formatLocalDateTime(dateFin),
contactId: contactId,
state: state // Assign the selected state string
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