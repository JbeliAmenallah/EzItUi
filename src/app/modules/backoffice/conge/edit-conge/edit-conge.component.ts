import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Conge } from '../../../../shared/models/conge';

@Component({
  selector: 'app-edit-conge',
  templateUrl: './edit-conge.component.html',
  styleUrls: ['./edit-conge.component.css']
})
export class EditCongeComponent {

  @Input() displayDialog: boolean;
  @Input() selectedConge: Conge;
  stateOptions: any[] = [
    { label: 'Accepté', value: 'accepté' },
    { label: 'En attente', value: 'enattente' },
    { label: 'Rejeté', value: 'rejeté' }
  ];
  
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  saveConge() {
    this.onSave.emit();
  }

  hideDialog() {
    this.onHide.emit();
  }
}
