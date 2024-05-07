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
  contactOptions: any[] = [];
  typePrimes: any[] = [];
  anneeOptions: Annee[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService,
    private typePrimeService: TypePrimeService,
    private anneeService: AnneeService,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadContactOptions();
    this.fetchTypePrimes();
    this.loadAnnees();
  
  }

  createForm() {
    return this.formBuilder.group({
      primeId: [null, Validators.required],
      contact: [null, Validators.required],
      year: [null, Validators.required],
      month: [null, Validators.required],
      montant: [null, Validators.required],
      motif: [null, Validators.required],
      typePrime: [null, Validators.required]
    });
  }

  loadContactOptions() {
    this.absenceService.getEmployeeOptions().subscribe(
      options => {
        this.contactOptions = options;
        console.log('Contact Options:', this.contactOptions);
      },
      error => {
        console.error('Error fetching contact options:', error);
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

  onSubmit() {
    if (this.form.valid) {
      // Implement submission logic here
      console.log('Form submitted:', this.form.value);
    } else {
      // Handle form validation errors if needed
      console.log('Form invalid');
    }
  }
}
