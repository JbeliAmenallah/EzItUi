import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Autorisation } from '../../../../shared/models/autorisation';

@Component({
  selector: 'app-edit-autorisation',
  templateUrl: './edit-autorisation.component.html',
  styleUrls: ['./edit-autorisation.component.css']
})
export class EditAutorisationComponent {

  @Input() displayDialog: boolean;
  @Input() autorisation: Autorisation;
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

  saveAutorisation() {
    // Call the onSave event emitter to notify the parent component
    this.onSave.emit();
  }

  hideDialog() {
    // Call the onHide event emitter to notify the parent component
    this.onHide.emit();
  }

}
