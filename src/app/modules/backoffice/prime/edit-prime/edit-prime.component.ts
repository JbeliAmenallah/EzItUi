import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PrimeFormComponent } from '../prime-form/prime-form.component';
import { PrimeService } from '../../../../core/http/prime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Prime } from '../../../../shared/models/prime';

@Component({
  selector: 'app-edit-prime',
  templateUrl: './edit-prime.component.html',
  styleUrls: ['./edit-prime.component.css']
})
export class EditPrimeComponent implements OnInit {

  @ViewChild('form') primeForm: PrimeFormComponent;
  @Input() prime: Prime;
  primeId: any;
  messages: Message[] = [];
  contactids:Number[]=[];

  constructor(
    private primeService: PrimeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getContactIds();
  }

  initializeForm() {
    if (this.route.snapshot.paramMap.get('id') !== undefined) {
      this.primeId = this.route.snapshot.paramMap.get('id');
      this.getPrime();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.primeId = params['id'];
          this.getPrime();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.prime = extrasState['data'];
          } else {
            this.router.navigate(['/prime/list']);
          }
        }
      });
    }
  }

  getContactIds(): void {
  
    if (this.route.snapshot.paramMap.has('id')) {
      this.primeId = +this.route.snapshot.paramMap.get('id'); 

      this.primeService.getContactIdsByPrimeId(this.primeId).subscribe(
        (contactIds: number[]) => {
          this.contactids = contactIds;
          console.log(this.contactids)
        
        },
        (error) => {
          console.error('Error retrieving contact IDs:', error);
        }
      );
    }
  }

  getPrime() {
  this.primeService.getPrimeById(this.primeId).subscribe({
    next: (item: Prime) => {
      console.log("Retrieved prime:", item);
      this.prime = item;
      this.patchFormWithPrimeData(item);
    },
    error: (error) => {
      console.error("An error occurred while getting the prime:", error);
      this.goToList();
    }
  });
}

patchFormWithPrimeData(prime: Prime) {

  if (this.primeForm && this.primeForm.form) {
    console.log("Patch form with prime data:", prime);

    const selectedContacts = this.contactids.map(contactId => (console.log(contactId),{ label: contactId.toString(), value: contactId }));
console.log(selectedContacts)
    this.primeForm.form.patchValue({
      contactId: selectedContacts,
      year: prime.year,
      month: prime.month,
      montant: prime.montant,
      motif: prime.motif,
      typePrimeId: prime.typePrimeId
    });
  } else {
    console.error("Prime form or form control not available.");
  }
}


  goToList() {
    this.router.navigate(['/prime/list']);
  }

  save() {
    if (true) {
      const contactId = this.primeForm.form.get('contactId')?.value;
      const year = this.primeForm.form.get('year')?.value;
      const month = this.primeForm.form.get('month')?.value;
      const montant = this.primeForm.form.get('montant')?.value;
      const motif = this.primeForm.form.get('motif')?.value;
      const typePrimeId = this.primeForm.form.get('typePrimeId')?.value;
  
      this.prime.contactId = contactId;
      this.prime.year = year;
      this.prime.month = month;
      this.prime.montant = montant;
      this.prime.motif = motif;
      this.prime.typePrimeId = typePrimeId;
  
      this.primeService.updatePrime(this.primeId, this.prime).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The prime has been successfully updated.' });
          }, 100);
          this.router.navigate(['/prime/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while updating the prime.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
  
  
}
