import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicHoliday } from '../../../../shared/models/publicholiday';
import { Annee } from '../../../../shared/models/annee';
import { PublicHolidayService } from '../../../../core/http/publicholiday.service';
import { AnneeService } from '../../../../core/http/annee.service';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-publicholiday',
  templateUrl: './add-publicholiday.component.html',
  styleUrls: ['./add-publicholiday.component.css']
})
export class AddPublicHolidayComponent {
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  anneeOptions: Annee[] = [];
  displayDialog: boolean = false;
  messages: Message[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private publicHolidayService: PublicHolidayService,
    private anneeService: AnneeService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.createForm();
    this.loadAnnees();
  }

  createForm() {
    return this.formBuilder.group({
      jour: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      mois: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      libele: [null, Validators.required],
      anneeId: [null, Validators.required]
    });
  }

  loadAnnees() {
    this.anneeService.getAllAnnees().subscribe(
      (annees: Annee[]) => {
        this.anneeOptions = annees;
      },
      (error) => {
        console.error('Erreur lors du chargement des Annees :', error);
      }
    );
  }

  save(): void {
    if (this.form.valid) {
      const newPublicHoliday: PublicHoliday = {
        id: null,
        jour: this.form.value.jour,
        mois: this.form.value.mois,
        libele: this.form.value.libele,
        anneeId: this.form.value.anneeId
      };

      this.publicHolidayService.createPublicHoliday(newPublicHoliday).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le jour férié a été ajouté avec succès.' });
          this.onSave.emit();
          this.form.reset();
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/publicholiday/list']);
            });
          }, 1000); // Delay of 2 seconds before refreshing
        },
        (error) => {
          console.error('Erreur lors de l’ajout d’un jour férié :', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s’est produite lors de l’ajout du jour férié.' });
        }
      );
    } else {
      // Form is invalid, display validation errors
      this.form.markAllAsTouched();
    }
  }

  showDialog(): void {
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
  }
}
