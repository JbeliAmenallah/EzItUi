import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prime } from '../../../../shared/models/prime';
import { TypePrimeService } from '../../../../core/http/typeprime.service';
import { AbsenceService } from '../../../../core/http/absence.service';
import { Annee } from '../../../../shared/models/annee';
import { AnneeService } from '../../../../core/http/annee.service';

@Component({
  selector: 'app-prime-form',
  templateUrl: './prime-form.component.html',
  styleUrls: ['./prime-form.component.css']
})
export class PrimeFormComponent implements OnInit {

  form: FormGroup;
  employeeOptions: any[] = [];
  typePrimes: any[] = [];
  anneeOptions: Annee[] = [];
  months: { label: string; value: number; }[] = []; 


  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService,
    private typePrimeService: TypePrimeService,
    private anneeService: AnneeService,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadEmployeeOptions();
    this.fetchTypePrimes();
    this.loadAnnees();
    this.loadMonths(); 
  
  }

  createForm() {
    return this.formBuilder.group({
      contactId: [null, Validators.required],
      year: [null, Validators.required],
      month: [null, Validators.required],
      montant: [null, Validators.required],
      motif: [null, Validators.required],
      typePrimeId: [null]
    });
  }

  
  loadEmployeeOptions() {
    this.absenceService.getEmployeeOptions().subscribe(
      options => {
        this.employeeOptions = options;
        console.log('Employee Options:', this.employeeOptions); 
      },
      error => {
        console.error('Erreur lors de l’extraction des options de l’employée :', error);
      }
    );
  }

  fetchTypePrimes() {
    this.typePrimeService.fetchTypePrimes().subscribe(
      options => {
        this.typePrimes = options;
        console.log('type prime Options:', this.typePrimes);
      },
      error => {
        console.error('Error fetching type primes:', error);
      }
    );
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

  loadMonths() {
    for (let i = 1; i <= 12; i++) {
      this.months.push({ label: i.toString(), value: i });
    }
  }

}
