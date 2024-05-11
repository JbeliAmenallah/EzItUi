import { Component, OnInit } from '@angular/core';
import { Groupe } from '../../../../shared/models/groupe';
import { GroupeService } from '../../../../core/http/groupe.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-groupe-list',
  templateUrl: './groupe-list.component.html',
  styleUrls: ['./groupe-list.component.css']
})
export class GroupeListComponent implements OnInit {
  groupes: Groupe[] = [];
  loading: boolean = true;
  displayEditDialog: boolean = false;
  displayAddDialog: boolean = false;
  selectedGroupe: Groupe;

  constructor(
    private groupeService: GroupeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getGroupes();
  }

  getGroupes() {
    this.loading = true;
    this.groupeService.getAllGroupes().subscribe(
      (data) => {
        this.groupes = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Erreur lors de la récupération des groupes :', error);
      }
    );
  }

  editGroupe(groupe: Groupe) {
    this.selectedGroupe = groupe;
    this.displayEditDialog = true;
  }

  saveEditedGroupe(editedGroupe: Groupe) {
    if (editedGroupe) {
      this.groupeService.updateGroupe(editedGroupe.groupe_id, editedGroupe).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Groupe mis à jour avec succès' });
          this.displayEditDialog = false;
          this.getGroupes(); // Refresh the list
        },
        (error) => {
          console.error('Error updating groupe:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du groupe' });
        }
      );
    }
  }

  hideEditDialog() {
    this.displayEditDialog = false;
  }
  deleteItem(groupe_id: number) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce groupe ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.groupeService.deleteGroupe(groupe_id).subscribe(
          () => {
            this.getGroupes();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Groupe supprimé avec succès' });
          },
          (error) => {
            console.error('Error deleting groupe:', error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression du groupe' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
      }
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  hideAddDialog() {
    this.displayAddDialog = false;
  }

  saveNewGroupe(newGroupe: Groupe) {
    this.groupeService.createGroupe(newGroupe).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Groupe ajouté avec succès' });
        this.hideAddDialog();
        this.getGroupes();
      },
      (error) => {
        console.error('Error creating groupe:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la création du groupe' });
      }
    );
  }
}
