import { Component, OnInit, ViewChild } from '@angular/core';
import { AbsenceFormComponent } from '../absence-form/absence-form.component';
import { Absence } from '../../../../shared/models/absence';
import { AbsenceService } from '../../../../core/http/absence.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.css']
})
export class AddAbsenceComponent implements OnInit {

  @ViewChild('form') absenceForm: AbsenceFormComponent;
  private absence: Absence;
  messages: Message[] = [];

  constructor(
    private service: AbsenceService,
    private router: Router,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.absence = {
      contactId: null,
      dateDebutAbsence: null,
      dateFinAbsence: null,
      reason: '',
      justified:false
    };
    this.messageService.messageObserver.subscribe((messages: Message[]) => {
      if (messages && Array.isArray(messages)) {
        this.messages = messages; 
      } else {
        this.messages = []; 
      }
    });
  }

  save() {
    if (this.absenceForm.form.valid) {
      this.absence.contactId = this.absenceForm.form.get('contactId')?.value;
      this.absence.dateDebutAbsence = new Date(this.absenceForm.form.get('dateDebutAbsence')?.value).toISOString();
      this.absence.dateFinAbsence = new Date(this.absenceForm.form.get('dateFinAbsence')?.value).toISOString();
      this.absence.reason = this.absenceForm.form.get('reason')?.value;
      this.absence.justified = this.absenceForm.form.get('justified')?.value;
  
      this.service.addAbsence(this.absence).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’absence a été ajoutée avec succès.' });
            setTimeout(() => {
                this.router.navigate(['/absence/list']);
            }, 1000); // Delay navigation by 1 second
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
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur de validation', detail: 'Veuillez remplir tous les champs obligatoires.' });
    }
  }
  
}
