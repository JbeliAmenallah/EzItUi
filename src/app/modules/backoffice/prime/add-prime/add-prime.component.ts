import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeService } from '../../../../core/http/prime.service';
import { PrimeFormComponent } from '../prime-form/prime-form.component';
import { Prime } from '../../../../shared/prime';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-prime',
  templateUrl: './add-prime.component.html',
  styleUrls: ['./add-prime.component.css']
})
export class AddPrimeComponent implements OnInit {

  @ViewChild('form') primeForm: PrimeFormComponent;
  private prime: Prime;
  messages: Message[] = [];

  constructor(
    private service: PrimeService,
    private router: Router,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.prime = {
      primeId: null,
      contact: null,
      year: null,
      month: null,
      montant: null,
      motif: '',
      typePrime: null
    };
  }

  save() {
    if (this.primeForm.form.valid) {
      const formValue = this.primeForm.form.value;
      this.prime = {
        primeId: null,
        contact: formValue.contact,
        year: formValue.year,
        month: formValue.month,
        montant: formValue.montant,
        motif: formValue.motif,
        typePrime: formValue.typePrime
      };
  
      this.service.addPrime(this.prime).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The prime has been successfully added.' });
          }, 100);
          this.router.navigate(['/prime/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the prime.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
  
}
