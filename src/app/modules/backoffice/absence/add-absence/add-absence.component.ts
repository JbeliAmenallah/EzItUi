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
      reason: ''
    };
  }

  save() {
    if (this.absenceForm.form.valid) {
      this.absence.contactId = this.absenceForm.form.get('contactId')?.value;
      this.absence.dateDebutAbsence = this.absenceForm.form.get('dateDebutAbsence')?.value;
      this.absence.dateFinAbsence = this.absenceForm.form.get('dateFinAbsence')?.value;
      this.absence.reason = this.absenceForm.form.get('reason')?.value;

      this.service.addAbsence(this.absence).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The absence has been successfully added.' });
          }, 100);
          this.router.navigate(['/absence/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the absence.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}
