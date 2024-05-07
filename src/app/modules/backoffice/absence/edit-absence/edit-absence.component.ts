import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Absence } from '../../../../shared/models/absence';
import { AbsenceService } from '../../../../core/http/absence.service';
import { Message, MessageService, SelectItem } from 'primeng/api';


@Component({
  selector: 'app-edit-absence',
  templateUrl: './edit-absence.component.html',
  styleUrls: ['./edit-absence.component.css']
})
export class EditAbsenceComponent implements OnInit {
  absence: Absence;
  editForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = null;
  messages: Message[] = [];

  @Input() displayDialog: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    this.loadAbsence();
    this.initializeForm();

    this.messageService.messageObserver.subscribe((messages: Message[]) => {
      if (messages && Array.isArray(messages)) {
        this.messages = messages;
      } else {
        this.messages = [];
      }
    });

  }

  loadAbsence(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.absenceService.getAbsenceById(id).subscribe(
      (absence: Absence) => {
        console.log('Fetched Absence:', absence);
        this.absence = absence;
        this.initializeForm();
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Impossible d’aller chercher l’absence. Veuillez réessayer.';
        this.loading = false;
      }
    );
  }


  initializeForm(): void {
    console.log('Absence:', this.absence);
    console.log('dateDebutAbsence:', this.absence ? this.absence.dateDebutAbsence : null);
    console.log('dateFinAbsence:', this.absence ? this.absence.dateFinAbsence : null);

    const dateDebutAbsence = this.absence ? new Date(this.absence.dateDebutAbsence) : null;
    const dateFinAbsence = this.absence ? new Date(this.absence.dateFinAbsence) : null;

    // Convert justified value to boolean if it's a string
    const justifiedValue = this.absence ? this.absence.justified.toString() : null;
    console.log(justifiedValue)
    this.editForm = this.formBuilder.group({
      contactId: [this.absence ? this.absence.contactId : null],
      dateDebutAbsence: [dateDebutAbsence],
      dateFinAbsence: [dateFinAbsence],
      reason: [this.absence ? this.absence.reason : null],
      justified: [justifiedValue]
    });

  }



  onSubmit(): void {
    console.log('Submit button clicked');
    console.log('Form validity:', this.editForm.valid);
    console.log('Absence object:', this.absence);

    if (this.editForm.valid && this.absence) {
      console.log('Form is valid and absence is defined');
      const updatedAbsence: Absence = { ...this.editForm.value };
      console.log('Updated Absence:', updatedAbsence);
      this.absenceService.updateAbsence(this.absence.absenceId, updatedAbsence).subscribe(
        () => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’absence a été mise à jour avec succès.' });
            setTimeout(() => {
              this.router.navigate(['/absence/list']);
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
    } else {
      console.log('Form is invalid or absence is not defined');
    }
  }

  onCancel(): void {
    this.router.navigate(['/absence/list']);
  }
}