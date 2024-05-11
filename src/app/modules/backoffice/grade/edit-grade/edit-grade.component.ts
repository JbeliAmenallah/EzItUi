import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grade } from '../../../../shared/models/grade';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent implements OnInit {
  @Input() grade: Grade;
  @Input() displayEditDialog: boolean; // Add input for dialog display
  @Output() onSave: EventEmitter<Grade> = new EventEmitter<Grade>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    console.log('Grade received:', this.grade); // Log the grade received
    console.log('Display edit dialog:', this.displayEditDialog); // Log the displayEditDialog value
    if (this.grade) {
      this.initializeForm();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grade'] && !changes['grade'].firstChange) {
      console.log('Grade changed:', this.grade); // Log when grade changes
      this.initializeForm();
    }
  }
  initializeForm(): void {
    this.form.patchValue({
      libele: this.grade ? this.grade.libele || '' : ''
    });
  }

  createForm() {
    return this.formBuilder.group({
      libele: [null, Validators.required]
    });
  }

  save(): void {
    console.log('Saving...'); // Log when the save method is called
    if (this.form.valid) {
      const editedGrade: Grade = {
        ...this.grade,
        libele: this.form.controls['libele'].value
      };
      console.log('Edited grade:', editedGrade); // Log the edited grade
      this.onSave.emit(editedGrade);
      this.hideDialog(); // Hide the dialog after emitting onSave event
    } else {
      this.markFormGroupTouched(this.form);
      // Do not hide the dialog if the form is invalid
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

  showDialog(): void {
    console.log('Showing dialog...'); // Log when showDialog is called
    this.displayEditDialog = true;
  }

  hideDialog(): void {
    console.log('Hiding dialog...'); // Log when hideDialog is called
    this.displayEditDialog = false;
  }
}
