import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    this.form.patchValue({
      libele: this.grade?.libele || ''
    });
  }

  createForm() {
    return this.formBuilder.group({
      libele: [null, Validators.required]
    });
  }

  save(): void {
    if (this.form.valid) {
      const editedGrade: Grade = {
        ...this.grade,
        libele: this.form.controls['libele'].value
      };
      this.onSave.emit(editedGrade);
      this.hideDialog();
    } else {
      // Form is invalid, display validation errors
      this.markFormGroupTouched(this.form);
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
    this.displayEditDialog = true;
  }

  hideDialog(): void {
    this.displayEditDialog = false;
  }
}
