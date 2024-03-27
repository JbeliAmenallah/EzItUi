import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conge-form',
  templateUrl: './conge-form.component.html',
  styleUrls: ['./conge-form.component.css']
})
export class CongeFormComponent implements OnInit {
  @Input() conge: any; // Input property to receive Conge object
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>(); // Event emitter for form submission

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      state: ['', Validators.required],
      contactId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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

  // Method to handle form submission
  submitForm() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
