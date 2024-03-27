import { Component, OnInit } from '@angular/core';
import { FunctionalityCriterion } from '../../../../shared/models/functionalityCriterion';
import { FunctionalityCriterionService } from '../../../../core/auth/functionalityCriterion.service';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-functionality-criterion-list',
  templateUrl: './functionality-criterion-list.component.html',
  styleUrls: ['./functionality-criterion-list.component.css']
})
export class FunctionalityCriterionListComponent implements OnInit {
  loading: boolean = true;
  functionalityCriteria: FunctionalityCriterion[] = [];
  functionalityCriteriaIdBug: number[] = [];
  items: MenuItem[] | undefined;

  constructor(private confirmationService: ConfirmationService,
    private serviceFunctionalityCriterion: FunctionalityCriterionService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getList();
    this.items = [
      {
          icon: 'pi pi-pencil',
          command: () => {
              this.messageService.add({ severity: 'info', summary: 'Ajouter', detail: 'Données ajoutées' });
          }
      }, {
          icon: 'pi pi-trash',
          command: () => {
              this.messageService.add({ severity: 'error', summary: 'Supprimer', detail: 'Données supprimées' });
          }
      }
    ];
  }

  getList() {
    this.serviceFunctionalityCriterion.list().subscribe(
      (items: FunctionalityCriterion[]) => {
        this.functionalityCriteria = items;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données : ', error);
        this.loading = false;
      }
    );
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer cet élément?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        
        accept: () => {
            if (id !== undefined) {
                this.serviceFunctionalityCriterion.delete(id).subscribe(
                    () => {
                      console.log("this is : ",id)
                      this.getList();
                        this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'critère de fonctionnalité supprimé avec succès' });
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression' });
                    }
                );
            }
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
        }
    });
  }

  editItem(item: FunctionalityCriterion) {
   console.log(item);
   this.router.navigate(['/functionalityCriterion/edit/' + item.id], {
     state: { data: item }
   });
 }

 handleCheckboxChange(event: any, id: number) {
  if (event.checked) {
      // Ajoutez l'ID à functionalityCriteriaIdBug
      this.functionalityCriteriaIdBug.push(id);
  } else {
      // Supprimez l'ID de functionalityCriteriaIdBug
      const index = this.functionalityCriteriaIdBug.indexOf(id);
      if (index !== -1) {
          this.functionalityCriteriaIdBug.splice(index, 1);
      }
  }
}

logFunctionalityCriteriaIdBug() {
  console.log('Liste des IDs de critères de fonctionnalité pour les bogues :', this.functionalityCriteriaIdBug);
}

}
