import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Groupe } from '../../../../shared/models/groupe';

@Component({
  selector: 'app-edit-groupe',
  templateUrl: './edit-groupe.component.html',
  styleUrls: ['./edit-groupe.component.css']
})
export class EditGroupeComponent implements OnInit {
  @Output() onSave: EventEmitter<Groupe> = new EventEmitter<Groupe>();
  @Input() displayEditDialog: boolean = false;
  @Input() groupe: Groupe; // Input for the selected Groupe to edit
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.patchForm();
  }

  createForm() {
    return this.formBuilder.group({
      libele: [null, Validators.required]
    });
  }

  patchForm() {
    if (this.groupe) {
      this.form.patchValue({
        libele: this.groupe.libele
      });
    }
  }

  save(): void {
    if (this.form.valid) {
      const editedGroupe: Groupe = {
        id: this.groupe.id,
        libele: this.form.controls['libele'].value
      };
      this.onSave.emit(editedGroupe);
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
