
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autorisation } from '../../../../shared/models/autorisation';
import { AutorisationService } from '../../../../core/http/autorisation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-autorisation-list',
  templateUrl: './autorisation-list.component.html',
  styleUrls: ['./autorisation-list.component.css']
})
export class AutorisationListComponent implements OnInit {

  autorisations: Autorisation[];
  loading: boolean = false;
  selectedAutorisation: Autorisation;
  displayDialog: boolean = false;

  constructor(
    private autorisationService: AutorisationService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService

  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.autorisationService.getAllAutorisations().subscribe(
      (items: Autorisation[]) => {
        this.autorisations = items;
        console.log(items)
      },
      (error) => {
        console.error('Erreur lors de la récupération des autorisations :', error);
      }
    );
  }

  editItem(autorisation: Autorisation) {
    this.selectedAutorisation = { ...autorisation };
    this.displayDialog = true;
    console.log("clicked")
  }
  
  saveAutorisation() {
    if (!this.selectedAutorisation) {
      console.error('Aucune autorisation sélectionnée.');
      return;
    }
  
    this.autorisationService.updateAutorisation(this.selectedAutorisation.autorisationId, this.selectedAutorisation).subscribe(
      () => {
        this.getList();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Autorisation mise à jour avec succès' });
        this.hideDialog();
      },
      (error) => {
        if (typeof error === 'object' && error !== null) {
          // Handle the validation error response
          for (const [field, message] of Object.entries(error)) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: `${field}: ${message}` });
          }
        } else {
          // Handle other errors
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error });
        }
      }
    );
  }
  

  hideDialog() {
    this.displayDialog = false;
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette autorisation  ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (id !== undefined) {
          this.autorisationService.deleteAutorisation(id).subscribe(
            () => {
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Autorisation supprimée avec succès' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la suppression d’une autorisation ' });
            }
          );
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
      }
    });
  }
  addAutorisation() {
    this.router.navigate(['/autorisations/add']);
  }
}
