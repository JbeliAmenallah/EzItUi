import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Autorisation } from '../../../../shared/models/autorisation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-autorisation',
  templateUrl: './edit-autorisation.component.html',
  styleUrls: ['./edit-autorisation.component.css']
})
export class EditAutorisationComponent implements OnInit {

  @Input() displayDialog: boolean;
  @Input() autorisation: Autorisation;
  stateOptions = [
    { label: 'Accepté', value: 'Accepté' },
    { label: 'En attente', value: 'En attente' },
    { label: 'Rejeté', value: 'Rejeté' }
  ];

  @Output() onSave: EventEmitter<Autorisation> = new EventEmitter<Autorisation>();
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const dateDebutAutorisation = this.autorisation ? new Date(this.autorisation.dateDebut) : null;
    const dateFinAutorisation = this.autorisation ? new Date(this.autorisation.dateFin) : null;

    this.form = this.formBuilder.group({
      dateDebutAutorisation: [dateDebutAutorisation, Validators.required], 
      dateFinAutorisation: [dateFinAutorisation,Validators.required], 
      contactId: [this.autorisation.contactId, Validators.required], 
      state: [this.autorisation.state, Validators.required]
    });
  }
 

  saveAutorisation() {
    this.onSave.emit(this.autorisation);
  }

  hideDialog() {
    this.onHide.emit();
  }

}
