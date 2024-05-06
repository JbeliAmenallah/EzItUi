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
  { label: 'Accepté', value: 'Accepté' },
  { label: 'En attente', value: 'En attente' },
  { label: 'Rejeté', value: 'Rejeté' }
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
        console.error('Messages non valides reçus :', messages);
        this.messages = []; // Reset messages array
      }
    });
  }
  

initStateOptions() {
if (this.stateOptions.length === 0) {
this.stateOptions = [
  { label: 'Accepté', value: 'Accepté' },
  { label: 'En attente', value: 'En attente' },
  { label: 'Rejeté', value: 'Rejeté' }
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
        // Handle success
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’autorisationa été ajoutée avec succès.' });
          setTimeout(() => {
              this.router.navigate(['/autorisations/list']);
          }, 100); // Delay navigation by 1 second
      }, 10);
    },
      (error) => {
        // Handle error
        console.error('Erreur lors de l’enregistrement de l’autorisation :', error);
        if (error.status === 400) {
          // Validation errors
          const validationErrors = error.error;
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: validationErrors[key] });
            }
          }
        } else {
          // Other errors
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Echec de l’enregistrement de l’autorisation.' });
        }
      }
    );
  } else {
    console.log('Form is invalid');
    this.form.markAllAsTouched();
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs obligatoires.' });
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