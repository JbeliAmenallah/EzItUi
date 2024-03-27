import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupFunctionality } from '../../../../shared/models/groupfunctionality';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { GroupFunctionalityFormComponent } from '../groupfunctionalities-form/groupfunctionality-form.component';
import { GroupFunctionalityService } from '../../../../core/http/groupfunctionality.service';

@Component({
  selector: 'app-add-groupfunctionality',
  templateUrl: './add-groupfunctionality.component.html',
  styleUrls: ['./add-groupfunctionality.component.css']
})
export class AddGroupFunctionalityComponent implements OnInit {

  @ViewChild('form') groupFunctionalityForm: GroupFunctionalityFormComponent;
  private groupFunctionality: GroupFunctionality;
  messages: Message[] = [];

  constructor(
    private service: GroupFunctionalityService,
    private router: Router,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.groupFunctionality = {
      groupName: '',
      duration: null,
      startDate: null,
      endDate: null,
      projectId: null
    };
  }

  save() {
    if (this.groupFunctionalityForm.form.valid) {
      this.groupFunctionality.groupName = this.groupFunctionalityForm.form.get('groupName')?.value;
      this.groupFunctionality.duration = this.groupFunctionalityForm.form.get('duration')?.value;
      this.groupFunctionality.startDate = this.groupFunctionalityForm.form.get('startDate')?.value;
      this.groupFunctionality.endDate = this.groupFunctionalityForm.form.get('endDate')?.value;
      this.groupFunctionality.projectId = this.groupFunctionalityForm.form.get('projectId')?.value;
      this.service.create(this.groupFunctionality).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The group functionality has been successfully added.' });
          }, 100);
          this.router.navigate(['/groupfunctionalities']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the group functionality.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}
