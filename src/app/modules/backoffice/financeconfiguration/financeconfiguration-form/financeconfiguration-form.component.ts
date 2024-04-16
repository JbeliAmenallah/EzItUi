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
  formErpp: FormGroup; 
  formCss: FormGroup; 

  anneeOptions: Annee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private anneeService: AnneeService
  ) { }

  ngOnInit(): void {
    this.formCnss = this.createForm('Cnss');
    this.formDeduction = this.createForm('Deduction');
    this.formTva = this.createForm('TVA');
    this.formErpp = this.createForm('Erpp');
    this.formCss = this.createForm('Css');

    this.loadAnnees();
  }

  createForm(libele: string) {
    return this.formBuilder.group({
      libele: [libele],
      year: [null, Validators.required],
      taux: [null, Validators.compose([Validators.required, Validators.min(0)])],
      anneeId: [null, Validators.required],
      cssValue0: [null, Validators.required], 
      cssValue1: [null, Validators.required], 
      cssValue2: [null, Validators.required], 
      cssValue3: [null, Validators.required],
      cssValue4: [null, Validators.required],
      erppValue0: [null, Validators.required],
      erppValue1: [null, Validators.required],
      erppValue2: [null, Validators.required], 
      erppValue3: [null, Validators.required], 
      erppValue4: [null, Validators.required],
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
