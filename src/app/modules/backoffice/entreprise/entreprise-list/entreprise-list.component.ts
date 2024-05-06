import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from '../../../../shared/models/Entreprise';
import { EntrepriseService } from '../../../../core/http/entreprise.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-entreprises-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.css']
})
export class EntreprisesListComponent implements OnInit {

  entreprises: Entreprise[];
  loading: boolean = false;

  constructor(
    private entrepriseService: EntrepriseService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.entrepriseService.getAllEntreprises().subscribe(
      (items: Entreprise[]) => {
        this.entreprises = items.reverse();
      }
    );
  }

  editItem(item: Entreprise): void {
    console.log(item);
    this.router.navigate(['/entreprise/edit/' + item.entrepriseId], {
      state: { data: item },
      
    });

  }

  deleteItem(entrepriseId: number) {
    console.log("Suppression d’entreprise avec entrepriseId :", entrepriseId);
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette entreprise ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        this.entrepriseService.deleteEntreprise(entrepriseId).subscribe(
          () => {
            this.getList();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'L’entreprise a été supprimée avec succès' });
          },
          (error) => {
            console.error('Error deleting entreprise:', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de l’entreprise' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
      }
    });
  }
  

}
