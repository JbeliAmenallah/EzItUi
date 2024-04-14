import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryService } from '../../../../core/http/salary.service';
import { AbsenceService } from '../../../../core/http/absence.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  generateForm: FormGroup;
  contactOptions: any[]; // Assuming your contacts have a 'name' property

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private absenceService: AbsenceService
  ) { }

  ngOnInit() {
    // Initialize form with default values if needed
    this.generateForm = this.fb.group({
      yearInput: [null, [Validators.required]],
      monthInput: [null, [Validators.required]],
      contact: [null, [Validators.required]]
    });

    // Initialize year and month to default values
    this.generateForm.patchValue({
      yearInput: new Date().getFullYear(),
      monthInput: new Date().getMonth() + 1
    });

    // Load contacts when the component initializes
    this.loadContactOptions();
  }

  loadContactOptions() {
    this.absenceService.getEmployeeOptions().subscribe(
      options => {
        this.contactOptions = options;
        console.log('Contact Options:', this.contactOptions);
      },
      error => {
        console.error('Error fetching contact options:', error);
      }
    );
  }

  generateSalary() {
    if (this.generateForm.invalid) {
      console.error('Form is invalid.');
      this.markFormGroupTouched(this.generateForm);
      return;
    } 
  
    const year = this.generateForm.get('yearInput').value;
    const month = this.generateForm.get('monthInput').value;
    const selectedContacts = this.generateForm.get('contact').value;
  
    // Ensure there is at least one selected contact
    if (!selectedContacts || selectedContacts.length === 0) {
      console.error('Please select at least one contact.');
      return;
    }
  
    let contactId;
    if (selectedContacts.length === 1) {
      // Only one contact selected, extract its ID
      contactId = selectedContacts[0];
    } else {
      // Multiple contacts selected, set contactId to null
      contactId = null;
    }
  
    console.log('Year:', year);
    console.log('Month:', month);
    console.log('Contact ID:', contactId);
  
    // Construct the payload object
    const payload = {
      contactId: contactId,
      year: year,
      month: month,
      filePath: 'filePath' // Replace with the actual file path
    };
  
    // Call the appropriate service method based on contactId
    if (contactId !== null) {
      this.salaryService.generateSalaryForContact(payload).subscribe(
        () => {
          console.log('Salary generated for selected contact!');
          // Handle success
        },
        (error) => {
          console.error('Error generating salary for selected contact:', error);
          // Handle error
        }
      );
    } else {
      this.salaryService.generateSalaryForAllContacts(year, month).subscribe(
        () => {
          console.log('Salary generated for all selected contacts!');
          // Handle success
        },
        (error) => {
          console.error('Error generating salary for all selected contacts:', error);
          // Handle error
        }
      );
    }
  }
  
  
  
  
  
  

  // Helper method to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
