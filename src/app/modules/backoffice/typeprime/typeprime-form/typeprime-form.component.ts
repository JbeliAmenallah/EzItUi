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
      code: [
        null,
        Validators.compose([Validators.required]),
      ],
      libele: [
        null,
        Validators.compose([Validators.required]),
      ],
      cnss: [
        null,
        Validators.compose([Validators.required]),
      ],
      impo: [
        null,
        Validators.compose([Validators.required]),
      ],
      montant: [
        null,
        Validators.compose([Validators.required]),
      ],
      type: [
        null,
        Validators.compose([Validators.required]),
      ],
      abasedesalaire: [false],
      categorie: [
        null,
        Validators.compose([Validators.required]),
      ],
      grp: [
        null,
        Validators.compose([Validators.required]),
      ],
      grade: [
        null,
        Validators.compose([Validators.required]),
      ],
      obligatoire: [false],
    });
  }

  updateForm() {
    return this.formBuilder.group({
      code: [
        this.currentItemForm.code,
        Validators.compose([Validators.required]),
      ],
      libele: [
        this.currentItemForm.libele,
        Validators.compose([Validators.required]),
      ],
      cnss: [
        this.currentItemForm.cnss,
        Validators.compose([Validators.required]),
      ],
      impo: [
        this.currentItemForm.impo,
        Validators.compose([Validators.required]),
      ],
      montant: [
        this.currentItemForm.montant,
        Validators.compose([Validators.required]),
      ],
      type: [
        this.currentItemForm.type,
        Validators.compose([Validators.required]),
      ],
      abasedesalaire: [
        this.currentItemForm.abasedesalaire || false,
      ],
      categorie: [
        this.currentItemForm.categorie,
        Validators.compose([Validators.required]),
      ],
      grp: [
        this.currentItemForm.grp,
        Validators.compose([Validators.required]),
      ],
      grade: [
        this.currentItemForm.grade,
        Validators.compose([Validators.required]),
      ],
      obligatoire: [
        this.currentItemForm.obligatoire || false,
      ],
    });
  }
}
