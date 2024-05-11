import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TypePrime } from '../../../../shared/models/typeprime';
import { TypePrimeService } from '../../../../core/http/typeprime.service'; // Update this to your TypePrime service
import { SelectItem } from 'primeng/api'; // Import SelectItem type

@Component({
  selector: 'app-typeprime-form',
  templateUrl: './typeprime-form.component.html',
  styleUrls: ['./typeprime-form.component.css']
})
export class TypePrimeFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: TypePrime;

  types: SelectItem[] = [
    { label: 'Type 1', value: 'type1' },
    { label: 'Type 2', value: 'type2' }
  ];

  yesNoOptions: SelectItem[] = [
    { label: 'Oui', value: true },
    { label: 'Non', value: false }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private typePrimeService: TypePrimeService ,
  ) { }

  ngOnInit(): void {
    this.form = this.currentItemForm ? this.updateForm() : this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      code: [null, Validators.required],
      libele: [null, Validators.required],
      cnss: [null, this.booleanValidator()], 
      impo: [null, this.booleanValidator()], 
      montant: [null, Validators.required],
      type: [null, Validators.required],   
      abasedesalaire: [null, this.booleanValidator()], 
      grade: [],
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
      obligatoire: [this.currentItemForm.obligatoire || false],
    });
  }
  
  booleanValidator() {
    return (control) => {
      const value = control.value;
      if (value !== true && value !== false) {
        return { 'invalidBoolean': { value: value } };
      }
      return null;
    };
  }
}
