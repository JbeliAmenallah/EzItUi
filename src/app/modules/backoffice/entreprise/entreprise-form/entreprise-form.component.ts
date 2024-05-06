import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Entreprise } from '../../../../shared/models/Entreprise';
@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.css']
})
export class EntrepriseFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Entreprise;

  constructor(
    private formBuilder: FormBuilder,
    // Add other necessary services here
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      nom: [null, Validators.required],
      matricule: [null, Validators.required],
      siegesociale: [null, Validators.required],
      raisonSociale: [null, Validators.required],
      adresseDeSiege: [null, Validators.required],
      matriculeFiscale: [null, Validators.required],
      numCnss: [null, Validators.required],
      regimeSalariale: [null, Validators.required],
      nbrJourConge: [null, Validators.required],
    });
  }

  updateForm() {
    return this.formBuilder.group({
      nom: [
        this.currentItemForm.nom,
        Validators.compose([Validators.required]),
      ],
      matricule: [
        this.currentItemForm.matricule,
        Validators.compose([Validators.required]),
      ],
      siegesociale: [
        this.currentItemForm.siegesociale,
        Validators.compose([Validators.required]),
      ],
      raisonSociale: [
        this.currentItemForm.raisonSociale,
        Validators.compose([Validators.required]),
      ],
      adresseDeSiege: [
        this.currentItemForm.adresseDeSiege,
        Validators.compose([Validators.required]),
      ],
      matriculeFiscale: [
        this.currentItemForm.matriculeFiscale,
        Validators.compose([Validators.required]),
      ],
      numCnss: [
        this.currentItemForm.numCnss,
        Validators.compose([Validators.required]),
      ],
      regimeSalariale: [
        this.currentItemForm.regimeSalariale,
        Validators.compose([Validators.required]),
      ],
      nbrJourConge: [
        this.currentItemForm.nbrJourConge,
        Validators.compose([Validators.required]),
      ],
    });
  }
}
