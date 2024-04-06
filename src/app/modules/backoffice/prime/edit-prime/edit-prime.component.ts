import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PrimeFormComponent } from '../prime-form/prime-form.component';
import { PrimeService } from '../../../../core/http/prime.service';
import { Prime } from '../../../../shared/prime';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

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

  constructor(
    private primeService: PrimeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
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
            this.primeForm = extrasState['data'];
          } else {
            this.router.navigate(['/prime/list']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getPrime();
  }

  getPrime() {
    this.primeService.getPrimeById(this.primeId).subscribe({
      next: (item: Prime) => {
        this.prime = item;
        console.log(item);
      },
      error: (error) => {
        console.error("An error occurred while getting the prime:", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/prime/list']);
  }

  save() {
    if (true) {
      // Retrieve form values directly from form controls
      const contactId = this.primeForm.form.get('contactId')?.value;
      const year = this.primeForm.form.get('year')?.value;
      const month = this.primeForm.form.get('month')?.value;
      const montant = this.primeForm.form.get('montant')?.value;
      const motif = this.primeForm.form.get('motif')?.value;
      const typePrimeId = this.primeForm.form.get('typePrimeId')?.value;
  
      // Update the prime object with form values
      this.prime.contactId = contactId;
      this.prime.year = year;
      this.prime.month = month;
      this.prime.montant = montant;
      this.prime.motif = motif;
      this.prime.typePrimeId = typePrimeId;
  
      // Call the service to update the prime
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
