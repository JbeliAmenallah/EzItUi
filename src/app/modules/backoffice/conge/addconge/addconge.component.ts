import { Component } from '@angular/core';
import { Conge } from '../../../../shared/models/conge';
import { CongeService } from '../../../../core/http/conge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addconge',
  templateUrl: './addconge.component.html',
  styleUrls: ['./addconge.component.css']
})
export class AddcongeComponent {
  messages: any[] = []; // Declare messages property

  constructor(private congeService: CongeService, private router: Router) {}

  save(congeData: any) {
    // Ensure contactId is not null or empty
    if (!congeData.contactId || !congeData.contactId.value) {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Contact ID is required.' }];
      return;
    }

    // Adjusting contactId to be a number
    const newConge: Conge = {
      startDate: congeData.startDate,
      endDate: congeData.endDate,
      state: congeData.state,
      contactId: +congeData.contactId.value // Extract value from contactId object and convert to number
    };

    console.log('Saving Conge:', newConge); // Log the Conge object before sending

    this.congeService.saveConge(newConge).subscribe(response => {
      // Conge saved successfully, navigate to Conge list or do something else
      this.router.navigate(['/conges/list']);
    }, error => {
      // Handle error
      console.error(error);
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Failed to save Conge.' }];
    });
  }

}
