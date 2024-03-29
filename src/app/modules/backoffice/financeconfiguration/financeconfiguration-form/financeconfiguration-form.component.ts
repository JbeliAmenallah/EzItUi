import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annee } from '../../../../shared/models/annee';
import { AnneeService } from '../../../../core/http/annee.service';

@Component({
  selector: 'app-finance-configuration-form',
  templateUrl: './financeconfiguration-form.component.html',
  styleUrls: ['./financeconfiguration-form.component.css']
})
export class FinanceconfigurationFormComponent implements OnInit {

  form: FormGroup;
  anneeOptions: Annee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private anneeService: AnneeService
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadAnnees();
  }

  createForm() {
    return this.formBuilder.group({
      libele: [
        null,
        Validators.compose([Validators.required]),
      ],
      year: [
        null,
        Validators.compose([Validators.required]),
      ],
      taux: [
        null,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      anneeId: [
        null,
        Validators.compose([Validators.required]),
      ]
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.form.controls;
  }

  loadAnnees() {
    this.anneeService.getAllAnnees().subscribe(
      (annees: Annee[]) => {
        this.anneeOptions = annees;
      },
      (error) => {
        console.error('Error loading Annees:', error);
      }
    );
  }


}
