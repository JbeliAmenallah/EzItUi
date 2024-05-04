import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prime } from '../../../../shared/models/prime';
import { TypePrimeService } from '../../../../core/http/typeprime.service';
import { AbsenceService } from '../../../../core/http/absence.service';

@Component({
  selector: 'app-prime-form',
  templateUrl: './prime-form.component.html',
  styleUrls: ['./prime-form.component.css']
})
export class PrimeFormComponent implements OnInit {

  form: FormGroup;
  contactOptions: any[] = []; 
  typePrimes: any[] = []; 
  constructor(
    private formBuilder: FormBuilder,
    private absenceService : AbsenceService,
    private typePrimeService : TypePrimeService,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    this.loadContactOptions(); 
    this.fetchTypePrimes();
  }

  createForm() {
    return this.formBuilder.group({
      primeId: [
        null,
        Validators.compose([Validators.required]),
      ],
      contact: [
        [],
        Validators.compose([Validators.required]),
      ],
      year: [
        null,
        Validators.compose([Validators.required]),
      ],
      month: [
        null,
        Validators.compose([Validators.required]),
      ],
      montant: [
        null,
        Validators.compose([Validators.required]),
      ],
      motif: [
        null,
        Validators.compose([Validators.required]),
      ],
      typePrime: [
        null,
        Validators.compose([Validators.required]),
      ]
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
}
