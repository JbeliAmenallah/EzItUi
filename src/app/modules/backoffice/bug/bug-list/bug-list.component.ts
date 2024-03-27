import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BugService } from '../../../../core/auth/bug.service';
import { Bug } from '../../../../shared/models/bug';
import { FunctionalityCriterionService } from '../../../../core/auth/functionalityCriterion.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrl: './bug-list.component.css'
})
export class BugListComponent implements OnInit {
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  bugs : Bug [] = [];

  constructor(
    private serviceFunctionalityCriterion: FunctionalityCriterionService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService,
    private serviceBug : BugService
  ) {}
  ngOnInit(): void {
    this.getList();
  }
  
  getList() {
    this.serviceBug.list().subscribe(
      (items: Bug[]) => {
        this.bugs = items;
        this.bugs.forEach(bug => {
          console.log('functionalityCriterionIds: ', bug.functionalityCriterionIds);
          console.log('id: ', bug.id);
        });
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
                this.serviceBug.delete(id).subscribe(
                    () => {
                      console.log("this is : ",id)
                      this.getList();
                        this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'critère de bug supprimé avec succès' });
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
  editItem(item: Bug)
  {
   console.log(item);
   this.router.navigate(['/bugs/edit/' + item.id], {
     state: { data: item }
   });
 }
}
