import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Conge } from '../../../../shared/models/conge'; // Ensure correct path to Conge model

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

  saveConge() {
    this.onSave.emit();
  }

  hideDialog() {
    this.onHide.emit();
  }
}
