import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/http/category.service';
import { Category } from '../../../../shared/models/category';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @Input() category: Category;
  @Output() onSave: EventEmitter<Category> = new EventEmitter<Category>();
  @Input() displayEditDialog: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.form.patchValue({
      libele: this.category?.libele || ''
    });
  }

  createForm() {
    return this.formBuilder.group({
      libele: [null, Validators.required]
    });
  }

  save(): void {
    if (this.form.valid) {
      const editedCategory: Category = {
        ...this.category,
        libele: this.form.controls['libele'].value
      };
      this.onSave.emit(editedCategory);
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
