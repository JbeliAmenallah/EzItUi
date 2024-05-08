import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PublicHoliday } from '../../../../shared/models/publicholiday';
import { Annee } from '../../../../shared/models/annee';
import { PublicHolidayService } from '../../../../core/http/publicholiday.service';
import { AnneeService } from '../../../../core/http/annee.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-publicholiday',
  templateUrl: './edit-publicholiday.component.html',
  styleUrls: ['./edit-publicholiday.component.css']
})
export class EditPublicHolidayComponent implements OnChanges {
  @Input() publicHoliday: PublicHoliday;
  @Output() onSave: EventEmitter<PublicHoliday> = new EventEmitter<PublicHoliday>();
  form: FormGroup;
  anneeOptions: Annee[] = [];
  displayDialog: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private publicHolidayService: PublicHolidayService,
    private anneeService: AnneeService,
    private messageService: MessageService,
    private router:Router
  ) {
    this.form = this.createForm();
    this.loadAnnees();
  }

  ngOnChanges(): void {
    if (this.publicHoliday) {
      this.form.patchValue({
        jour: this.publicHoliday.jour,
        mois: this.publicHoliday.mois,
        libele: this.publicHoliday.libele,
        anneeId: this.publicHoliday.anneeId
      });
    }
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
      const editedPublicHoliday: PublicHoliday = {
        ...this.publicHoliday,
        jour: this.form.controls['jour'].value,
        mois: this.form.controls['mois'].value,
        libele: this.form.controls['libele'].value,
        anneeId: this.form.controls['anneeId'].value
      };
      console.log(`This is Public holiday object ${editedPublicHoliday}`)
      this.publicHolidayService.updatePublicHoliday(editedPublicHoliday.id, editedPublicHoliday).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le jour férié a été mis à jour avec succès.' });
          console.log(editedPublicHoliday)
          this.onSave.emit();
          this.form.reset();
          this.hideDialog();
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/publicholiday/list']);
            });
          }, 1000); // Delay of 2 seconds before refreshing
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du jour férié :', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s’est produite lors de la mise à jour du jour férié.' });
        }
      );
    } else {
      // Form is invalid, display validation errors
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  showDialog(): void {
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
  }
}
