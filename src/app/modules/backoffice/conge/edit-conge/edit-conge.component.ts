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
  
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  saveConge() {
    // Emit the onSave event to notify the parent component
    this.onSave.emit();
  }

  hideDialog() {
    // Emit the onHide event to notify the parent component
    this.onHide.emit();
  }
}
