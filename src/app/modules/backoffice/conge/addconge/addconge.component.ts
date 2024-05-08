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
  messages: any[] = [];

  constructor(
    private congeService: CongeService, 
    private router: Router,
   private messageService: MessageService

  ) {}

  save(congeData: any) {
    if (!congeData.contactId || !congeData.contactId.value) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'L’ID de contact est requis.' });
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
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le Conge a été ajouté avec succès.' });
          setTimeout(() => {
              this.router.navigate(['/conges/list']);
          }, 100);
      }, 10);
      }, 
      (error) => {
        if (typeof error === 'object' && error !== null) {
          // Handle the validation error response
          for (const [field, message] of Object.entries(error)) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: `${field}: ${message}` });
          }
        } else {
          // Handle other errors
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error });
        }
      }
    );
  }

}
