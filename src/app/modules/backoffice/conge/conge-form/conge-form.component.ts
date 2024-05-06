import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbsenceService } from '../../../../core/http/absence.service';

@Component({
  selector: 'app-conge-form',
  templateUrl: './conge-form.component.html',
  styleUrls: ['./conge-form.component.css']
})
export class CongeFormComponent implements OnInit {
  @Input() conge: any; // Input property to receive Conge object
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>(); // Event emitter for form submission

  form: FormGroup;
  employeeOptions: any[] = []; // Array to store employee options
  stateOptions: any[] = []; // Array to store state options

  constructor(private formBuilder: FormBuilder, private absenceService: AbsenceService) {
    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
      contactId: [null, Validators.required] // Set default value to null
    });
  }

  ngOnInit(): void {
    this.loadEmployeeOptions(); // Load employee options when component initializes
    this.initStateOptions(); // Initialize state options

    // If the conge object is provided, patch the form with its values
    if (this.conge) {
      this.form.patchValue({
        startDate: this.conge.startDate,
        endDate: this.conge.endDate,
        state: this.conge.state,
        contactId: this.conge.contactId
      });
    }
  }

  // Method to load employee options
  loadEmployeeOptions() {
    this.absenceService.getEmployeeOptions().subscribe(options => {
      this.employeeOptions = options;
    });
  }

  // Method to initialize state options
  initStateOptions() {
    this.stateOptions = [
      { label: 'Accepté', value: 'Accepté' },
      { label: 'En attente', value: 'En attente' },
      { label: 'Rejeté', value: 'Rejeté' }
    ];
  }

  // Method to handle form submission
  submitForm() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value); // Log form data before submission
      this.onSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
