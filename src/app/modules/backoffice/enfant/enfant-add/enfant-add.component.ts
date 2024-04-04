import { Component, OnInit, ViewChild } from '@angular/core';
import { EnfantFormComponent } from '../enfant-form/enfant-form.component'; // Assuming this component exists
import { Enfant } from '../../../../shared/models/Enfant';
import { EnfantService } from '../../../../core/http/enfant.service'; // Assuming this service exists
import { ContactService } from '../../../../core/http/contact.service'; // Assuming this service exists for fetching contact details
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-enfant-add',
  templateUrl: './enfant-add.component.html',
  styleUrls: ['./enfant-add.component.css']
})
export class EnfantAddComponent implements OnInit {

  @ViewChild('form') enfantForm: EnfantFormComponent;
  private enfant: Enfant;
  messages: Message[] = [];

  constructor(
    private enfantService: EnfantService, // Assuming this service exists
    private contactService: ContactService, // Assuming this service exists for fetching contact details
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.enfant = {
      id: null,
      name: '',
      familyName: '',
      age: null,
      disabled: false,
      educationGrade: '',
      contactId: null
      // Add other properties as needed
    };
  }

  save() {
    if (this.enfantForm.form.valid) {
      // Assign form values to enfant object
      this.enfant.id = this.enfantForm.form.get('id')?.value;
      this.enfant.name = this.enfantForm.form.get('name')?.value;
      this.enfant.familyName = this.enfantForm.form.get('familyName')?.value;
      this.enfant.age = this.enfantForm.form.get('age')?.value;
      this.enfant.disabled = this.enfantForm.form.get('disabled')?.value;
      this.enfant.educationGrade = this.enfantForm.form.get('educationGrade')?.value;
      this.enfant.contactId = this.enfantForm.form.get('contactId')?.value;
      // Assign other form values as needed
        console.log(this.enfant)
      // Call the service to add the enfant
      this.enfantService.createEnfant(this.enfant).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The enfant has been successfully added.' });
          }, 100);
          this.router.navigate(['/enfant/list']); // Navigate to list page after successful addition
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the enfant.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}
