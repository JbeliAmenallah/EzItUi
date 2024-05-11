import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Conge } from '../../../../shared/models/conge';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-conge',
  templateUrl: './edit-conge.component.html',
  styleUrls: ['./edit-conge.component.css']
})
export class EditCongeComponent {
  @Input() displayDialog: boolean;
  @Input() selectedConge: Conge;
  @Input() stateOptions: any[];

  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.selectedConge);
    this.initStateOptions();
  }

  initStateOptions() {
    this.stateOptions = [
      { label: 'Accepté', value: 'Accepté' },
      { label: 'En attente', value: 'En attente' },
      { label: 'Rejeté', value: 'Rejeté' }
    ];
  }


  saveConge() {
    console.log(this.selectedConge.startDate)
    this.onSave.emit();
  }

  hideDialog() {
    this.onHide.emit();
  }
}
