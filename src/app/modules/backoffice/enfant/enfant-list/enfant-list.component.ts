import { Component, OnInit } from '@angular/core';
import { EnfantService } from '../../../../core/http/enfant.service';
import { Enfant } from '../../../../shared/models/Enfant';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enfants-list',
  templateUrl: './enfant-list.component.html',
  styleUrls: ['./enfant-list.component.css']
})
export class EnfantListComponent implements OnInit {

  enfants: Enfant[];
  loading: boolean = false;

  constructor(
    private enfantService: EnfantService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.enfantService.getAllEnfants().subscribe(
      (items: Enfant[]) => {
        this.enfants = items.reverse();
      }
    );
  }

  editItem(item: Enfant): void {
    console.log(item);
    this.router.navigate(['/enfant/edit/' + item.id], {
      state: { data: item },
    });
  }

  deleteItem(enfantId: number) {
    console.log("Deleting enfant with ID:", enfantId);
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enfant ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (enfantId !== undefined) {
          this.enfantService.deleteEnfant(enfantId).subscribe(
            () => {
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Enfant supprimé avec succès' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de l’enfant' });
            }
          );
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
      }
    });
  }
}
