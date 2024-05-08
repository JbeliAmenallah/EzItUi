import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypePrime } from '../../../../shared/models/typeprime'; 
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypePrimeService } from '../../../../core/http/typeprime.service';

@Component({
  selector: 'app-typeprime-list', 
  templateUrl: './typeprime-list.component.html', 
  styleUrls: ['./typeprime-list.component.css'] 
})
export class TypePrimeListComponent implements OnInit {

  typePrimes: TypePrime[]; 
  loading: boolean = false;

  constructor(
    private typePrimeService: TypePrimeService,
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
    console.log("Suppression du type premier avec typePrimeId :", typePrimeId);
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce type de nombre premier ??',
      header: 'Confirmation de suppression',
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
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Type prime supprimé avec succès' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression du type premier' });
            }
          );
        }
        else { console.log(typePrimeId) }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Vous avez rejeté' });
      }
    });
  }

}