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
        console.error('Error fetching groupes:', error);
      }
    );
  }

  editGroupe(groupe: Groupe) {
    // Set selectedGroupe and display the EditGroupeComponent
    this.selectedGroupe = { ...groupe }; // Create a copy to avoid modifying original
    this.displayEditDialog = true;
  }

  saveEditedGroupe(editedGroupe: Groupe) {
    if (editedGroupe) {
      this.groupeService.updateGroupe(editedGroupe.id, editedGroupe).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Groupe updated successfully' });
          this.displayEditDialog = false;
          this.getGroupes(); // Refresh the list
        },
        (error) => {
          console.error('Error updating groupe:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating groupe' });
        }
      );
    }
  }

  hideEditDialog() {
    // Hide the EditGroupeComponent dialog
    this.displayEditDialog = false;
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this groupe?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.groupeService.deleteGroupe(id).subscribe(
          () => {
            this.getGroupes();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Groupe deleted successfully' });
          },
          (error) => {
            console.error('Error deleting groupe:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting groupe' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
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
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Groupe added successfully' });
        this.hideAddDialog();
        this.getGroupes();
      },
      (error) => {
        console.error('Error creating groupe:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating groupe' });
      }
    );
  }
}
