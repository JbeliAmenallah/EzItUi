import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deduction } from '../../../../shared/models/deduction'; // Adjust the import to match your Deduction model
import { Annee } from '../../../../shared/models/annee';
import { AnneeService } from '../../../../core/http/annee.service';

@Component({
  selector: 'app-deduction-form',
  templateUrl: './deduction-form.component.html',
  styleUrls: ['./deduction-form.component.css']
})
export class DeductionFormComponent implements OnInit {

  @Input() currentItemForm: Deduction;

  formDeduction: FormGroup; 
  anneeOptions: Annee[] = [];
  typeCalculOptions: any[] = [
{ label: 'Pourcentage', value: 'Pourcentage' },
{ label: 'Valeur', value: 'Valeur' }
  ];
  etatOptions: any[] = [
    { label: 'Activéé', value: 'Activé' },
    { label: 'Non activéé', value: 'Non activée' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private anneeService: AnneeService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.formDeduction = this.createForm();
    } else {
      this.formDeduction = this.updateForm();
    }
    this.loadAnnees();
  }

  createForm() {
    return this.formBuilder.group({
      anneeId: [null, Validators.required],
      libelle: [null, Validators.required],
      description: [null, Validators.required],
      etat: [null, Validators.required],
      typecalcul: [null, Validators.required],
      valeur: [null, Validators.compose([Validators.required, Validators.min(0)])], 
    });
  }

  updateForm() {
    return this.formBuilder.group({
      anneeId: [this.currentItemForm.anneeId, Validators.required],
      libelle: [this.currentItemForm.libelle, Validators.required],
      description: [this.currentItemForm.description, Validators.required],
      etat: [this.currentItemForm.etat, Validators.required],
      typecalcul: [this.currentItemForm.typecalcul, Validators.required],
      valeur: [this.currentItemForm.valeur, Validators.compose([Validators.required, Validators.min(0)])], 
    });
  }

  loadAnnees() {
    this.anneeService.getAllAnnees().subscribe(
      (annees: Annee[]) => {
        this.anneeOptions = annees;
      },
      (error) => {
        console.error('Erreur de chargement des années :', error);
      }
    );
  }
}
