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

    // Patch form with prime data
    this.primeForm.form.patchValue({
      contactId: [this.prime ? this.prime.contactId : null],
      year: prime.year,
      month: prime.month,
      montant: prime.montant,
      motif: prime.motif,
      typePrimeId: prime.typePrimeId,
      category:prime.category_id,
      grade:prime.grade_id,
      groupe:prime.groupe_id
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
      const contactId = this.primeForm.form.get('contactId')?.value[0];
      console.log(contactId)
      const year = this.primeForm.form.get('year')?.value;
      const month = this.primeForm.form.get('month')?.value;
      const montant = this.primeForm.form.get('montant')?.value;
      const motif = this.primeForm.form.get('motif')?.value;
      const typePrimeId = this.primeForm.form.get('typePrimeId')?.value;
      const selectedCategoryId: number = this.primeForm.form.get('category')?.value;
      const selectedGradeId: number = this.primeForm.form.get('grade')?.value;
      const selectedGroupId: number = this.primeForm.form.get('groupe')?.value;

      this.prime.contactId = contactId;
      this.prime.year = year;
      this.prime.month = month;
      this.prime.montant = montant;
      this.prime.motif = motif;
      this.prime.typePrimeId = typePrimeId;
      this.prime.category_id= selectedCategoryId;
      this.prime.grade_id= selectedGradeId;
      this.prime.groupe_id= selectedGroupId
      
      console.log(this.prime)
      this.primeService.updatePrime(this.primeId, this.prime).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le prime  a été mis à jour avec succès.' });
          }, 100);
          this.router.navigate(['/prime/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de la mise à jour du prime.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur de validation ', detail: 'Veuillez remplir tous les champs obligatoires.' });
    }
  }
  
  
}
