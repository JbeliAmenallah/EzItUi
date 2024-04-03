import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypePrime } from '../../../../shared/models/typeprime'; 
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypePrimeService } from '../../../../core/http/typeprime.service';

@Component({
  selector: 'app-typeprime-list', // Adjust selector
  templateUrl: './typeprime-list.component.html', // Adjust templateUrl
  styleUrls: ['./typeprime-list.component.css'] // Adjust styleUrls
})
export class TypePrimeListComponent implements OnInit {

  typePrimes: TypePrime[]; // Adjust type
  loading: boolean = false;

  constructor(
    private typePrimeService: TypePrimeService, // Adjust service
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.typePrimeService.getAllTypePrimes().subscribe(
      (items: TypePrime[]) => {
        this.typePrimes = items.reverse();
      }
    );
  }

  editItem(item: TypePrime): void {
    console.log(item);
    this.router.navigate(['/typeprime/edit/' + item.typePrimeId], {
      state: { data: item },
    });
  }

  deleteItem(typePrimeId: number) {
    console.log("Deleting type prime with typePrimeId:", typePrimeId);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this type prime?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (typePrimeId !== undefined) {
          this.typePrimeService.deleteTypePrime(typePrimeId).subscribe(
            () => {
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Type prime deleted successfully' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting type prime' });
            }
          );
        }
        else { console.log(typePrimeId) }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

}
