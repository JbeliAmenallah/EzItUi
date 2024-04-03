
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeService } from '../../../../core/http/prime.service';
import { Prime } from '../../../../shared/prime';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-prime',
  templateUrl: './edit-prime.component.html',
  styleUrls: ['./edit-prime.component.css']
})
export class EditPrimeComponent implements OnInit {

  form: FormGroup;
  prime: Prime;
  primeId: number;
  messages: any[] = [];

  constructor(
    private fb: FormBuilder,
    private primeService: PrimeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.primeId = this.route.snapshot.params['id'];
    this.initForm();
    this.loadPrime();
  }

  initForm(): void {
    this.form = this.fb.group({
      year: [null, Validators.required],
      month: [null, Validators.required],
      montant: [null, Validators.required],
      motif: [null, Validators.required],
      typePrime: [null, Validators.required],
      contact: [null, Validators.required]
    });
  }

  loadPrime(): void {
    this.primeService.getPrime(this.primeId).subscribe(
      (data) => {
        this.prime = data;
        this.form.patchValue({
          year: this.prime.year,
          month: this.prime.month,
          montant: this.prime.montant,
          motif: this.prime.motif,
          typePrime: this.prime.typePrime,
          contact: this.prime.contact
        });
      },
      (error) => {
        console.error('Error loading prime:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading prime' });
      }
    );
  }

  save(): void {
    if (this.form.valid) {
      const editedPrime: Prime = {
        primeId: this.primeId,
        year: this.form.get('year').value,
        month: this.form.get('month').value,
        montant: this.form.get('montant').value,
        motif: this.form.get('motif').value,
        typePrime: this.form.get('typePrime').value,
        contact: this.form.get('contact').value
      };

      this.primeService.updatePrime(this.primeId, editedPrime).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Prime updated successfully' });
          this.router.navigate(['/prime/list']);
        },
        (error) => {
          console.error('Error updating prime:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating prime' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }

  cancel(): void {
    this.router.navigate(['/prime/list']);
  }
}
