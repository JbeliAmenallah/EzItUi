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

  formCnss: FormGroup;
  formDeduction: FormGroup;
  formTva: FormGroup;
  anneeOptions: Annee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private anneeService: AnneeService
  ) { }

  ngOnInit(): void {
    this.formCnss = this.createForm('Cnss');
    this.formDeduction = this.createForm('Deduction');
    this.formTva = this.createForm('TVA');
    this.loadAnnees();
  }

  createForm(libele: string) {
    return this.formBuilder.group({
      libele: [libele],
      year: [null, Validators.compose([Validators.required])],
      taux: [null, Validators.compose([Validators.required, Validators.min(0)])],
      anneeId: [null, Validators.compose([Validators.required])]
    });
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
