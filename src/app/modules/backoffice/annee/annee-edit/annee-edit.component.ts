// annee-edit.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Annee } from '../../../../shared/models/annee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup

@Component({
  selector: 'app-edit-annee',
  templateUrl: './annee-edit.component.html',
  styleUrls: ['./annee-edit.component.css']
})
export class EditAnneeComponent {
  @Input() displayDialog: boolean;
  @Input() selectedAnnee: Annee;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  form: FormGroup; // Define form of type FormGroup

  constructor(private formBuilder: FormBuilder) {} 

  ngOnInit() {
    this.initForm(); 
  }
 
  saveAnnee() {
    this.onSave.emit();
  }

  hideDialog() {
    this.onHide.emit();
  }

  initForm() {
    // Check if selectedAnnee is not null or undefined
    if (this.selectedAnnee) {
      const dateDebutExercice = this.selectedAnnee.dateDebutExercice ? new Date(this.selectedAnnee.dateDebutExercice) : null;
  
      this.form = this.formBuilder.group({
        dateDebutExercice: [dateDebutExercice, Validators.required], 
        libele: [this.selectedAnnee.libele || '', Validators.required], // Use default value if libele is null or undefined
      });
    }
  }
  

  
}
