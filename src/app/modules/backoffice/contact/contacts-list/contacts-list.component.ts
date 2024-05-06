import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../../../shared/models/contact';
import { ContactService } from '../../../../core/http/contact.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact[];
  loading: boolean = false;
  constructor(
    private service: ContactService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.service.list().subscribe(
      (items: Contact[]) => {
        this.contacts = items.reverse();
      }
    );
  }

  editItem(item: Contact): void {
    console.log(item);
    this.router.navigate(['/contacts/edit/' + item.id], {
      state: { data: item },
    });
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
          this.service.delete(id).subscribe(
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
