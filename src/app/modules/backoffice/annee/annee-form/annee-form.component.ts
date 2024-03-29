import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annee } from '../../../../shared/models/annee';

@Component({
  selector: 'app-annee-form',
  templateUrl: './annee-form.component.html',
  styleUrls: ['./annee-form.component.css']
})
export class AnneeFormComponent implements OnInit {
  @Input() currentItemForm: Annee;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm();
    if (this.currentItemForm) {
      this.form.patchValue(this.currentItemForm);
    }
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      dateDebutExercice: [null, Validators.required],
      libele: [null, Validators.required]
    });
  }
}
