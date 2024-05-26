import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryService } from '../../../../core/http/salary.service';
import { AbsenceService } from '../../../../core/http/absence.service';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { EmployeeService   } from '../../../../core/http/employee.service';


@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  generateForm: FormGroup;
  contactOptions: any[]; 
  messages: any[] = [];
  showPDF: boolean = false;
  payslipData: any


  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private absenceService: AbsenceService,
    private employeeService:EmployeeService,
    private router: Router
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
 /*
  generateSalary() {
    if (this.generateForm.invalid) {
      console.error('Form is invalid.');
      this.markFormGroupTouched(this.generateForm);
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Form is invalid. Please fill in all required fields.', life: 3000 }];
      return;
    }
  
    const year = this.generateForm.get('yearInput').value;
    const month = this.generateForm.get('monthInput').value;
    const selectedContacts = this.generateForm.get('contact').value;
  
    // Ensure there is at least one selected contact
    if (!selectedContacts || selectedContacts.length === 0) {
      console.error('Please select at least one contact.');
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Please select at least one contact.', life: 3000 }];
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
  
    // Construct the payload object
    const payload = {
      contactId: contactId,
      year: year,
      month: month,
      filePath: 'filePath'
    };
  
    // Generate salary
    if (contactId !== null) {
      this.salaryService.generateSalaryForContact(payload).subscribe(
        () => {
          console.log('Salary generated for selected contact!');
          this.messages = [{ severity: 'success', summary: 'Success', detail: 'Salary generated for selected contact!', life: 3000 }];
          // Set showPDF to true after generating salary
          this.showPDF = true;
          // Navigate to the list component after success
          this.router.navigate(['/salary/list']);
        },
        (error) => {
          console.error('Error generating salary for selected contact:', error);
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error generating salary for selected contact!', life: 3000 }];
        }
      );
    } else {
      this.salaryService.generateSalaryForAllContacts(year, month).subscribe(
        () => {
          console.log('Salary generated for all selected contacts!');
          this.messages = [{ severity: 'success', summary: 'Success', detail: 'Salary generated for all selected contacts!', life: 3000 }];
          // Set showPDF to true after generating salary
          this.showPDF = true;
          // Navigate to the list component after success
          this.router.navigate(['/salary/list']);
        },
        (error) => {
          console.error('Error generating salary for all selected contacts:', error);
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error generating salary for all selected contacts!', life: 3000 }];
        }
      );
    }
  }*/

  generatePDF() {
    if (this.generateForm.invalid) {
      console.error('Form is invalid.');
      this.markFormGroupTouched(this.generateForm);
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Form is invalid. Please fill in all required fields.', life: 3000 }];
      this.updateMessages();
      return;
    }
  
    const year = this.generateForm.get('yearInput').value;
    const month = this.generateForm.get('monthInput').value;
    const selectedContacts = this.generateForm.get('contact').value;
  
    // Ensure there is at least one selected contact
    if (!selectedContacts || selectedContacts.length === 0) {
      console.error('Please select at least one contact.');
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Please select at least one contact.', life: 3000 }];
      this.updateMessages();
      return;
    }
  
    selectedContacts.forEach(contactId => {
      const payload = {
        contactId: contactId,
        year: year,
        month: month,
        filePath: 'filePath' // You need to provide the file path here
      };
  
      // Generate PDF for each contact
      this.salaryService.generateSalaryForContact(payload).subscribe(
        () => {
          // Fetch employee name
          this.employeeService.getEmployeeById(contactId).subscribe(
            (employee) => {
              const employeeName = employee.name;
              console.log(`Employee name: ${employeeName}`);
              // Add logic to use the employee name as needed
            },
            (error) => {
              console.error(`Error fetching employee details for contact ${contactId}:`, error);
            }
          );
  
          const element = document.getElementById('payslip'); // The ID of the HTML element you want to convert to PDF
          const opt = {
            margin:       1,
            filename:     `payslip_${contactId}.pdf`, // Filename includes contactId
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
          
          html2pdf().from(element).set(opt).save();
          this.showPDF = true; // Display PDF content
          console.log(`PDF generated for contact ${contactId}!`);
          this.messages.push({ severity: 'success', summary: 'Success', detail: `PDF generated for contact ${contactId}!`, life: 3000 });
          this.updateMessages();
          
          this.payslipData = { ...payload }; 
        },
        (error) => {
          console.error(`Error generating PDF for contact ${contactId}:`, error);
          this.messages.push({ severity: 'error', summary: 'Error', detail: `Error generating PDF for contact ${contactId}`, life: 3000 });
          this.updateMessages();
        }
      );
    });
  }
  
  

  updateMessages() {
    this.messages = [...this.messages];
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