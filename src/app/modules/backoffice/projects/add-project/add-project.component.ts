import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../../../core/http/project.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  @ViewChild('form') projectForm: ProjectFormComponent;
  private project: Project;
  messages: Message[] = [];

  constructor(
    private service: ProjectService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.project = {
      projectName: '',
      description: '',
      startDate: null,
      endDate: null,
      estimatedDuration: 0
    };
  }

  save() {

    if (this.projectForm.form.valid) {
      this.project.projectName = this.projectForm.form.get('projectName')?.value;
      this.project.description = this.projectForm.form.get('description')?.value;
      this.project.startDate = this.projectForm.form.get('startDate')?.value;
      this.project.endDate = this.projectForm.form.get('endDate')?.value;
      this.project.estimatedDuration = parseFloat(this.projectForm.form.get('estimatedDuration')?.value);
  
      this.service.create(this.project).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The project has been successfully added.' });
          }, 100);
          this.router.navigate(['/projects']);
        },
        (error) => {
          console.error('An error occurred:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the project.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}