import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annee } from '../../../../shared/models/annee';
import { AnneeService } from '../../../../core/http/annee.service';
import { FinanceConfiguration } from '../../../../shared/models/financeConfiguration';

@Component({
  selector: 'app-finance-configuration-form',
  templateUrl: './financeconfiguration-form.component.html',
  styleUrls: ['./financeconfiguration-form.component.css']
})
export class FinanceconfigurationFormComponent implements OnInit {
  @Input() formFinance: FormGroup; 
  @Input() financeConfig: FinanceConfiguration;

  anneeOptions: Annee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private anneeService: AnneeService
  ) { }

  ngOnInit(): void {
    this.formFinance = this.createForm('Finance configuration'); 
    this.loadAnnees();
    if (this.financeConfig && this.financeConfig.anneeId) {
      this.formFinance.get('anneeId').setValue(this.financeConfig.anneeId);
    }
  }

  createForm(libele: string) {
    return this.formBuilder.group({
      anneeId: [null, Validators.required],
      cnss: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      css1: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      css2: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      css3: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      css4: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      css5: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      tva: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      deduction: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      irpp1: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      irpp2: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      irpp3: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      irpp4: [null, Validators.compose([Validators.required, Validators.min(0)])], 
      irpp5: [null, Validators.compose([Validators.required, Validators.min(0)])], 
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
