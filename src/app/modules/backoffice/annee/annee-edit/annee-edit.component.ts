import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Annee } from '../../../../shared/models/annee';

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

  saveAnnee() {
    // Emit the onSave event to notify the parent component
    this.onSave.emit();
  }

  hideDialog() {
    // Emit the onHide event to notify the parent component
    this.onHide.emit();
  }
}
