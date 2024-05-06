import { Component } from '@angular/core';
import { Conge } from '../../../../shared/models/conge';
import { CongeService } from '../../../../core/http/conge.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addconge',
  templateUrl: './addconge.component.html',
  styleUrls: ['./addconge.component.css']
})
export class AddcongeComponent {
  messages: any[] = []; // Declare messages property

  constructor(
    private congeService: CongeService, 
    private router: Router,
   private messageService: MessageService

  ) {}

  save(congeData: any) {
    // Ensure contactId is not null or empty
    if (!congeData.contactId || !congeData.contactId.value) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contact ID is required.' });
      return;
    }
  
    const newConge: Conge = {
      startDate: congeData.startDate,
      endDate: congeData.endDate,
      state: congeData.state,
      contactId: +congeData.contactId.value 
    };
  
    console.log('Saving Conge:', newConge); 
  
    this.congeService.saveConge(newConge).subscribe(
      () => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The  Conge has been successfully added.' });
          setTimeout(() => {
              this.router.navigate(['/conges/list']);
          }, 100); // Delay navigation by 1 second
      }, 10);
      }, 
      (error) => {
        console.error('Error saving conge:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Conge.' });
      }
    );
  }

}
