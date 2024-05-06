import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeFormComponent } from '../prime-form/prime-form.component';
import { PrimeService } from '../../../../core/http/prime.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Prime } from '../../../../shared/models/prime';

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
    private primeService: PrimeService,
    private router: Router,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.prime = {
      contactId: null,
      year: null,
      month: null,
      montant: null,
      motif: null,
      typePrimeId: null
    };
  }

  save() {
    const selectedContactIds: number[] = this.primeForm.form.get('contact')?.value;
    if (selectedContactIds && selectedContactIds.length > 0) { 
      selectedContactIds.forEach(contactId => {
        const prime = {
          contactId: contactId,
          year: this.primeForm.form.get('year')?.value,
          month: this.primeForm.form.get('month')?.value,
          montant: this.primeForm.form.get('montant')?.value,
          motif: this.primeForm.form.get('motif')?.value,
          typePrimeId: this.primeForm.form.get('typePrime')?.value
        };
    
        console.log('Prime Object:', prime); 
    
        this.primeService.addPrime(prime).subscribe(
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
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please select at least one contact.' });
    }
  }
  
  
  
}
