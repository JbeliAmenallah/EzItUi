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
      typePrimeId: null,
      category_id:null,
      grade_id:null,
      groupe_id:null
    };
  }

  save() {
    if (this.primeForm.form.valid) {
      console.log('Form is valid.');
  
      const selectedContactIds: number[] = this.primeForm.form.get('contactId')?.value;
      const selectedAnneeId: number = this.primeForm.form.get('year')?.value;
      const month = new Date(this.primeForm.form.get('month')?.value).getMonth() + 1;
      const selectedCategoryId: number = this.primeForm.form.get('category')?.value;
      const selectedGradeId: number = this.primeForm.form.get('grade')?.value;
      const selectedGroupId: number = this.primeForm.form.get('groupe')?.value;
  
      if (selectedContactIds && selectedContactIds.length > 0 && selectedAnneeId && 
          (selectedCategoryId || selectedGradeId || selectedGroupId)) {
        selectedContactIds.forEach(contactId => {
          const prime = {
            contactId: contactId, 
            year: selectedAnneeId,
            month: month,
            montant: this.primeForm.form.get('montant')?.value,
            motif: this.primeForm.form.get('motif')?.value,
            typePrimeId: this.primeForm.form.get('typePrimeId')?.value,
            category_id: selectedCategoryId,
            grade_id: selectedGradeId,
            groupe_id: selectedGroupId
          };
          
          console.log('Prime Object:', prime);
  
          // Add prime using both methods
          this.primeService.addPrime(prime).subscribe(
            (data) => {
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le prime a été ajouté avec succès' });
              }, 100);
              this.router.navigate(['/prime/list']);
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de l’enregistrement du prime .' });
            }
          );
  
          const prime1 = {
            year: selectedAnneeId,
            month: month,
            montant: this.primeForm.form.get('montant')?.value,
            motif: this.primeForm.form.get('motif')?.value,
            typePrimeId: this.primeForm.form.get('typePrimeId')?.value,
            category_id: selectedCategoryId,
            grade_id: selectedGradeId,
            groupe_id: selectedGroupId
          };
          
          console.log('Prime DTO:', prime1);
  
          this.primeService.addPrimeToEmployeesByCategoryGradeOrGroup(prime1).subscribe(
            (data) => {
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le prime a été ajouté avec succès.' });
              }, 100);
              this.router.navigate(['/prime/list']);
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de l’enregistrement du prime .' });
            }
          );
        });
      } else if ((selectedCategoryId || selectedGradeId || selectedGroupId) && selectedAnneeId) {
        const primeDTO = {
          year: selectedAnneeId,
          month: month,
          montant: this.primeForm.form.get('montant')?.value,
          motif: this.primeForm.form.get('motif')?.value,
          typePrimeId: this.primeForm.form.get('typePrimeId')?.value,
          category_id: selectedCategoryId,
          grade_id: selectedGradeId,
          groupe_id: selectedGroupId
        };
        
        console.log('Prime DTO:', primeDTO);
  
        this.primeService.addPrimeToEmployeesByCategoryGradeOrGroup(primeDTO).subscribe(
          (data) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le prime a été ajouté avec succès.' });
            }, 100);
            this.router.navigate(['/prime/list']);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de l’enregistrement du prime .' });
          }
        );
      } else if (selectedContactIds && selectedContactIds.length > 0 && selectedAnneeId) {
        selectedContactIds.forEach(contactId => {
          const prime = {
            contactId: contactId, 
            year: selectedAnneeId,
            month: month,
            montant: this.primeForm.form.get('montant')?.value,
            motif: this.primeForm.form.get('motif')?.value,
            typePrimeId: this.primeForm.form.get('typePrimeId')?.value
          };
          
          console.log('Prime Object:', prime);
  
          this.primeService.addPrime(prime).subscribe(
            (data) => {
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le prime a été ajouté avec succès.' });
              }, 100);
              this.router.navigate(['/prime/list']);
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error.message || 'Une erreur s’est produite lors de l’enregistrement du prime .' });
            }
          );
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erreur de validation ', detail: 'Veuillez sélectionner au moins un contact ou une catégorie/niveau/groupe et année.' });
      }
    } else {
      console.log('Form is invalid.');
    }
  }
  
  
  
  
}
