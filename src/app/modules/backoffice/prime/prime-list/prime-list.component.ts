import { Component, OnInit } from '@angular/core';
import { Prime } from '../../../../shared/prime';
import { PrimeService } from '../../../../core/http/prime.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPrimes();
  }

  getPrimes() {
    this.loading = true;
    this.primeService.getAllPrimes().subscribe(
      (data) => {
        this.primes = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching primes:', error);
        if (error instanceof HttpErrorResponse && error.status === 200) {
          // Handle the case where the response is not valid JSON
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unexpected response format from the server' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching primes' });
        }
      }
    );
  }
  
  editPrime(prime: Prime) {
    // Set selectedPrime and display the EditPrimeComponent
    this.selectedPrime = { ...prime }; // Create a copy to avoid modifying original
    this.displayEditDialog = true;
  }

  saveEditedPrime() {
    if (this.selectedPrime) {
      this.primeService.updatePrime(this.selectedPrime.primeId, this.selectedPrime).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Prime updated successfully' });
          this.displayEditDialog = false;
          this.getPrimes(); // Refresh the list
        },
        (error) => {
          console.error('Error updating prime:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating prime' });
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
      message: 'Are you sure you want to delete this prime?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.primeService.deletePrime(id).subscribe(
          () => {
            this.getPrimes();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Prime deleted successfully' });
          },
          (error) => {
            console.error('Error deleting prime:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting prime' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  
}
