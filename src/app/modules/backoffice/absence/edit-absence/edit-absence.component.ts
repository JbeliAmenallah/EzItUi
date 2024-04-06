import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Absence } from '../../../../shared/models/absence';

@Component({
  selector: 'app-edit-absence',
  templateUrl: './edit-absence.component.html',
  styleUrls: ['./edit-absence.component.css']
})
export class EditAbsenceComponent {

  @Input() displayDialog: boolean;
  @Input() selectedAbsence: Absence;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  justifiedOptions: any[] = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' }
  ];

  saveAbsence() {
    // Emit the onSave event to notify the parent component
    this.onSave.emit();
  }

  hideDialog() {
    // Emit the onHide event to notify the parent component
    this.onHide.emit();
  }
}
