import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GroupFunctionality } from '../../../../shared/models/groupfunctionality';
import { GroupFunctionalityService } from '../../../../core/http/groupfunctionality.service';


@Component({
  selector: 'app-groupfunctionality-list',
  templateUrl: './groupfunctionality-list.component.html',
  styleUrl: './groupfunctionality-list.component.css'
})
export class GroupfunctionalityListComponent {

  groupfunctionality: GroupFunctionality[];
  loading: boolean = false;
  

  constructor(
    private service: GroupFunctionalityService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
 

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.service.list().subscribe(
      (items: GroupFunctionality[]) => {
        this.groupfunctionality = items.reverse();
      }
    );
  }

  showDetails(id: number)
  {
   console.log(id);
   this.router.navigate(['/groupfunctionalities/details/' +id], {
     state: { data: id }
   });
 }

  editItem(item: GroupFunctionality): void {
    console.log(item);
    this.router.navigate(['/groupfunctionalities/edit/' + item.id], {
      state: { data: item },
    });
  }


  deleteItem(id: number) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this item?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        accept: () => {
            if (id !== undefined) {
                this.service.delete(id).subscribe(
                    () => {
                        this.getList();
                        this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Projet supprimé avec succès' });
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression' });
                    }
                );
            }
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Vous avez rejeté' });
        }
    });
}

}
