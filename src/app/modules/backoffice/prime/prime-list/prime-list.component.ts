import { Component, OnInit } from '@angular/core';
import { PrimeService } from '../../../../core/http/prime.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Prime } from '../../../../shared/models/prime';

@Component({
  selector: 'app-prime-list',
  templateUrl: './prime-list.component.html',
  styleUrls: ['./prime-list.component.css']
})
export class PrimeListComponent implements OnInit {
  primes: Prime[] = [];
  loading: boolean = true;
  displayEditDialog: boolean = false;
  selectedPrime: Prime;

  constructor(
    private primeService: PrimeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router 

  ) {}

  ngOnInit(): void {
    this.getPrimes();
  }

  getPrimes() {
    this.loading = true;
    this.primeService.getAllPrimes().subscribe(
      (data) => {
        this.primes = data;
        console.log(this.primes)
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching primes:', error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 200) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Format de réponse inattendu du serveur' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la récupération des primes' });
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la récupération des primes' });
        }
      }
    );
  }
  
  editPrime(prime: Prime): void {
    console.log(prime);
    this.router.navigate(['/prime/edit/' + prime.primeId], {
      state: { data: prime },
    });
  }
  
  saveEditedPrime() {
    if (this.selectedPrime) {
      this.primeService.updatePrime(this.selectedPrime.primeId, this.selectedPrime).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Prime mis à jour avec succès' });
          this.displayEditDialog = false;
          this.getPrimes(); // Refresh the list
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de prime:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de prime' });
        }
      );
    }
  }

  hideEditDialog() {
    // Hide the EditPrimeComponent dialog
    this.displayEditDialog = false;
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce prime?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.primeService.deletePrime(id).subscribe(
          () => {
            this.getPrimes();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Prime supprimé avec succès' });
          },
          (error) => {
            console.error('Error deleting prime:', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de prime' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
      }
    });
  }
}
