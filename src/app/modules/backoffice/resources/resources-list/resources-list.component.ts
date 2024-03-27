import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from '../../../../shared/models/resource'; // Assurez-vous d'importer correctement le modèle Resource
import { ResourceService } from '../../../../core/http/resource.service'; // Assurez-vous d'importer correctement le service ResourceService
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {

  resources: Resource[];
  loading: boolean = false;
  constructor(
    private service: ResourceService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.service.list().subscribe(
      (items: Resource[]) => {
        this.resources = items.reverse();
      }
    );
  }
  showDetails(id: number)
  {
   console.log(id);
   this.router.navigate(['/resources/details/' +id], {
     state: { data: id }
   });
 }


  editItem(item: Resource): void {
    console.log(item);
    this.router.navigate(['/resources/edit/' + item.id], {
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
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Resource deleted successfully' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting resource' });
            }
          );
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You rejected' });
      }
    });
  }
}
