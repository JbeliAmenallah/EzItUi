import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Conge } from '../../../../shared/models/conge';
import { CongeService } from '../../../../core/http/conge.service';

@Component({
  selector: 'app-conge-list',
  templateUrl: './conge-list.component.html',
  styleUrls: ['./conge-list.component.css']
})
export class CongeListComponent implements OnInit {

  conges: Conge[];
  loading: boolean = false;

  // Selected conge for editing
  selectedConge: Conge;

  // Display dialog flag
  displayDialog: boolean = false;

  constructor(
    private congeService: CongeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.congeService.getAllConges().subscribe(
      (items: Conge[]) => {
        this.conges = items;
      },
      (error) => {
        console.error('Erreur lors de la récupération des congés :', error);
      }
    );
  }

  editItem(conge: Conge) {
    this.selectedConge = { ...conge };
    console.log('Selected Conge:', this.selectedConge); // Check the selected conge
    console.log('Selected Conge ID:', this.selectedConge.congeId); // Check the selected conge's ID
    this.displayDialog = true;
}


saveConge() {
  // Check if selectedConge is defined and has an id
  if (this.selectedConge && this.selectedConge.congeId) {
      this.congeService.updateConge(this.selectedConge.congeId, this.selectedConge).subscribe(
          () => {
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Conge a été mis à jour avec succès' });
              this.hideDialog();
          },
          (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de conge' });
          }
      );
  } else {
      console.error('Le conge ou l’ID de conge sélectionné n’est pas défini.');
  }
}



  hideDialog() {
    this.displayDialog = false;
  }

  moveToDetails(congeId: number) {
    this.router.navigate(['/conges/details/' + congeId]);
  }

  addConge() {
    this.router.navigate(['/conges/add']);
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet élément ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (id !== undefined) {
          this.congeService.deleteConge(id).subscribe(
            () => {
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Contact supprimé avec succès' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression d’un contact' });
            }
          );
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Vous avez rejeté' });
      }
    });
  }
}
