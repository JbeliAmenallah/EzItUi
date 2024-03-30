import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicHoliday } from '../../../../shared/models/publicholiday';
import { PublicHolidayService } from '../../../../core/http/publicholiday.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-publicholiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class PublicHolidayListComponent implements OnInit {

  publicHolidays: PublicHoliday[];
  loading: boolean = false;
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;
  selectedPublicHoliday: PublicHoliday;

  constructor(
    private publicHolidayService: PublicHolidayService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.publicHolidayService.getAllPublicHolidays().subscribe(
      (items: PublicHoliday[]) => {
        this.publicHolidays = items.reverse();
      }
    );
  }

  deleteItem(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this public holiday?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.publicHolidayService.deletePublicHoliday(id).subscribe(
          () => {
            this.getList();
            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Public Holiday deleted successfully' });
          },
          (error) => {
            console.error('Error deleting public holiday:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting public holiday' });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Deletion cancelled' });
      }
    });
  }

  showAddDialog(): void {
    this.displayAddDialog = true;
  }

  hideAddDialog(): void {
    this.displayAddDialog = false;
  }

  editItem(publicHoliday: PublicHoliday): void {
    this.selectedPublicHoliday = { ...publicHoliday }; // Clone the object
    this.displayEditDialog = true;
  }

  hideEditDialog(): void {
    this.displayEditDialog = false;
  }

  saveEditedPublicHoliday(updatedPublicHoliday: PublicHoliday): void {

  }  

}
