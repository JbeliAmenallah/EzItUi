import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TypePrime } from '../../../../shared/models/typeprime';
import { TypePrimeService } from '../../../../core/http/typeprime.service'; // Update this to your TypePrime service

@Component({
  selector: 'app-typeprime-form',
  templateUrl: './typeprime-form.component.html',
  styleUrls: ['./typeprime-form.component.css']
})
export class TypePrimeFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: TypePrime;

  types: any[] = [
    { label: 'Select', value: '' },
    { label: 'Type 1', value: 'type1' },
    { label: 'Type 2', value: 'type2' }
  ];

  yesNoOptions: any[] = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private typePrimeService: TypePrimeService // Update this to your TypePrime service
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }
    // Other initialization logic if needed
  }

  createForm() {
    return this.formBuilder.group({
      code: [null, Validators.required],
      libele: [null, Validators.required],
      cnss: [null],
      impo: [null],
      montant: [null, Validators.required],
      type: [null, Validators.required],
      abasedesalaire: [false],
      categorie: [],
      grp: [],
      grade: [],
      obligatoire: [false],
    });
  }
  
  updateForm() {
    return this.formBuilder.group({
      code: [this.currentItemForm.code, Validators.required],
      libele: [this.currentItemForm.libele, Validators.required],
      cnss: [this.currentItemForm.cnss],
      impo: [this.currentItemForm.impo],
      montant: [this.currentItemForm.montant, Validators.required],
      type: [this.currentItemForm.type, Validators.required],
      abasedesalaire: [this.currentItemForm.abasedesalaire || false],
      categorie: [this.currentItemForm.categorie],
      grp: [this.currentItemForm.grp],
      grade: [this.currentItemForm.grade],
      obligatoire: [this.currentItemForm.obligatoire || false],
    });
  }
  
}
