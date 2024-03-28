import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Conge } from '../../../../shared/models/conge';
import { CongeService } from '../../../../core/http/conge.service';

@Component({
  selector: 'app-conge-list',
  templateUrl: './conge-list.component.html',
  styleUrls: ['./conge-list.component.css']
})
export class CongeListComponent implements OnInit {

  conges: Conge[];
  loading: boolean = false;

  // Selected conge for editing
  selectedConge: Conge;

  // Display dialog flag
  displayDialog: boolean = false;

  constructor(
    private congeService: CongeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.congeService.getAllConges().subscribe(
      (items: Conge[]) => {
        this.conges = items;
      },
      (error) => {
        console.error('Error fetching conges:', error);
      }
    );
  }

  editItem(conge: Conge) {
    this.selectedConge = { ...conge };
    console.log('Selected Conge:', this.selectedConge); // Check the selected conge
    console.log('Selected Conge ID:', this.selectedConge.congeId); // Check the selected conge's ID
    this.displayDialog = true;
}


saveConge() {
  // Check if selectedConge is defined and has an id
  if (this.selectedConge && this.selectedConge.congeId) {
      this.congeService.updateConge(this.selectedConge.congeId, this.selectedConge).subscribe(
          () => {
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Conge updated successfully' });
              this.hideDialog();
          },
          (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating conge' });
          }
      );
  } else {
      console.error('Selected Conge or Conge ID is undefined.');
  }
}



  hideDialog() {
    this.displayDialog = false;
  }

  moveToDetails(congeId: number) {
    this.router.navigate(['/conges/details/' + congeId]);
  }

  addConge() {
    this.router.navigate(['/conges/add']);
  }
  deleteItem(conge: Conge) {
    if (confirm('Are you sure you want to delete this conge?')) {
      this.deleteConge(conge.congeId);
    }
  }

  deleteConge(congeId: number) {
    this.congeService.deleteConge(congeId).subscribe(
      () => {
        this.getList();
        // Optionally, show a success message
      },
      (error) => {
        console.error('Error deleting conge:', error);
        // Optionally, show an error message
      }
    );
  }
}
