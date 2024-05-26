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
  selectedConge: Conge;
  displayDialog: boolean = false;
  stateOptions: any[] = [
    { label: 'Accepté', value: 'accepté' },
    { label: 'En attente', value: 'enattente' },
    { label: 'Rejeté', value: 'rejeté' }
  ];

  

  constructor(
    private congeService: CongeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
    this.selectedConge.startDate = new Date(this.selectedConge.startDate);
    this.selectedConge.endDate = new Date(this.selectedConge.endDate);
    console.log(this.selectedConge.startDate)
    console.log('Selected Conge:', this.selectedConge); 
    console.log('Selected Conge ID:', this.selectedConge.congeId); 
    this.displayDialog = true;
}


saveConge() {
  if (this.selectedConge && this.selectedConge.congeId) {
      this.congeService.updateConge(this.selectedConge.congeId, this.selectedConge).subscribe(
          () => {
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Congé a été mis à jour avec succès' });
              this.hideDialog();
          },
          (error) => {
            if (typeof error === 'object' && error !== null) {
              for (const [field, message] of Object.entries(error)) {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: `${field}: ${message}` });
              }
            } else {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error });
            }
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
      message: 'Voulez-vous vraiment supprimer cet congé ?',
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
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Congé supprimé avec succès' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression d’un congé' });
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
