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
    const newConge: Conge = {
      startDate: congeData.startDate,
      endDate: congeData.endDate,
      state: congeData.state,
      contactId: congeData.contactId
    };

    this.congeService.saveConge(newConge).subscribe(response => {
      // Conge saved successfully, navigate to Conge list or do something else
      this.router.navigate(['/conges']);
    }, error => {
      // Handle error
      console.error(error);
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Failed to save Conge.' }];
    });
  }
}
