import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../shared/models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  @Output() onSave: EventEmitter<Category> = new EventEmitter<Category>();
  @Input() displayAddDialog: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    return this.formBuilder.group({
      libele: [null, Validators.required]
    });
  }

  save(): void {
    if (this.form.valid) {
      const newCategory: Category = {
        libele: this.form.controls['libele'].value
      };
      this.onSave.emit(newCategory);
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
    this.displayAddDialog = true;
  }

  hideDialog(): void {
    this.displayAddDialog = false;
  }
}
