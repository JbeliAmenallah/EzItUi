import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../shared/models/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnChanges {
  @Input() category: Category;
  @Output() onSave: EventEmitter<Category> = new EventEmitter<Category>();
  @Input() displayEditDialog: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && changes['category'].currentValue) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      libele: [this.category ? this.category.libele : null, Validators.required]
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
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
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
