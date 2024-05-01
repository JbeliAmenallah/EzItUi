import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Autorisation } from '../../../../shared/models/autorisation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-autorisation',
  templateUrl: './edit-autorisation.component.html',
  styleUrls: ['./edit-autorisation.component.css']
})
export class EditAutorisationComponent {

  @Input() displayDialog: boolean;
  @Input() autorisation: Autorisation;
  @Output() onSave: EventEmitter<Autorisation> = new EventEmitter<Autorisation>();
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      contactId: [null, Validators.required],
      state: [null, Validators.required]
    });
  }

  saveAutorisation() {
      this.onSave.emit();
  }

  hideDialog() {
    this.onHide.emit();
  }

}
