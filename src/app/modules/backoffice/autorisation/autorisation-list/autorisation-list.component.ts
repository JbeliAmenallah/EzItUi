import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autorisation } from '../../../../shared/models/autorisation';
import { AutorisationService } from '../../../../core/http/autorisation.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-autorisation-list',
  templateUrl: './autorisation-list.component.html',
  styleUrls: ['./autorisation-list.component.css']
})
export class AutorisationListComponent implements OnInit {

  autorisations: Autorisation[];
  loading: boolean = false;
  selectedAutorisation: Autorisation;
  displayDialog: boolean = false;

  constructor(
    private autorisationService: AutorisationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.autorisationService.getAllAutorisations().subscribe(
      (items: Autorisation[]) => {
        this.autorisations = items;
      },
      (error) => {
        console.error('Error fetching autorisations:', error);
      }
    );
  }

  editItem(autorisation: Autorisation) {
    this.selectedAutorisation = { ...autorisation };
    this.displayDialog = true;
    console.log("clicked")
  }
  saveAutorisation() {
    if (!this.selectedAutorisation) {
      console.error('No autorisation selected.');
      return;
    }
  
    this.autorisationService.updateAutorisation(this.selectedAutorisation.autorisationId, this.selectedAutorisation).subscribe(
      () => {
        this.getList();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Autorisation updated successfully' });
        this.hideDialog();
      },
      (error) => {
        if (error.status === 400 && error.error && error.error.message) {
          // Handle specific validation errors from the server
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        } else {
          // Handle other errors
          console.error('Error updating autorisation:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating autorisation' });
        }
      }
    );
  }
  

  hideDialog() {
    this.displayDialog = false;
  }

  deleteAutorisation(autorisation: Autorisation) {
    if (!autorisation || !autorisation.autorisationId) {
      console.error('Invalid autorisation:', autorisation);
      return;
    }
  
    this.autorisationService.deleteAutorisation(autorisation.autorisationId).subscribe(
      () => {
        this.getList();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Autorisation deleted successfully' });
      },
      (error) => {
        if (error.status === 400 && error.error && error.error.message) {
          // Handle specific validation errors from the server
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        } else {
          // Handle other errors
          console.error('Error deleting autorisation:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting autorisation' });
        }
      }
    );
  }
  addAutorisation() {
    this.router.navigate(['/autorisations/add']);
  }
}
