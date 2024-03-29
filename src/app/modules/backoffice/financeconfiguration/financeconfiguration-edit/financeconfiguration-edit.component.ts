import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinanceConfiguration } from '../../../../shared/models/financeConfiguration';

@Component({
  selector: 'app-financeconfiguration-edit',
  templateUrl: './financeconfiguration-edit.component.html',
  styleUrls: ['./financeconfiguration-edit.component.css']
})
export class FinanceconfigurationEditComponent {

  @Input() displayDialog: boolean;
  @Input() selectedFinanceConfig: FinanceConfiguration;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  saveFinanceConfig() {
    // Emit the onSave event to notify the parent component
    this.onSave.emit();
  }

  hideDialog() {
    // Emit the onHide event to notify the parent component
    this.onHide.emit();
  }
}
