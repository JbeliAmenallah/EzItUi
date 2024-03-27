

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../../../core/auth/project.service';
import { Message, MessageService } from 'primeng/api';

  @Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.css']
  })
  export class EditProjectComponent implements OnInit {
  
    @ViewChild('form') projectForm: ProjectFormComponent
    @Input() project: Project;
    messages: Message[] = [];

    id: any;
  
    constructor(
        private service: ProjectService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService

    ) {
      if(this.route.snapshot.paramMap.get('id')!= undefined){
        this.id = this.route.snapshot.paramMap.get('id');
        this.getProject()
      }else{
        this.route.queryParams.subscribe((params) => {
          if (params['id'] !== undefined) {
            this.id = params['id'];
            this.getProject();
          } else if (this.router.getCurrentNavigation() != null) {
            const extrasState = this.router.getCurrentNavigation()?.extras.state;
            if (extrasState !== undefined && extrasState['data'] !== undefined) {
              this.projectForm = extrasState['data'];
            } else {
              this.router.navigate(['/projects']);
            }
          }
        });}
    }
  
    ngOnInit(): void {this.getProject()}
    getProject() {
      this.service.read(this.id).subscribe({
          next: (item: Project) => {
              this.project = item;
              console.log(item);
          },
          error: (error) => {
              console.error("Une erreur s'est produite lors de la lecture du projet :", error);
              this.goToList();
          }
      });
  }
  
    goToList(){
      this.router.navigate(['/projects']);
    }
  
    save() {
      if (this.projectForm.form.valid) {
        this.project.projectName = this.projectForm.form.get('projectName')?.value;
        this.project.description = this.projectForm.form.get('description')?.value;
        this.project.startDate = this.projectForm.form.get('startDate')?.value;
        this.project.endDate = this.projectForm.form.get('endDate')?.value;
        this.project.estimatedDuration = parseFloat(this.projectForm.form.get('estimatedDuration')?.value);
          this.service.update(this.project).subscribe((data) => {
    
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The project has been successfully updated.' });
  
          }, 100);
          this.router.navigate(['/projects']);
          setTimeout(() => {
            this.router.navigate(['/projects']);
          }, 1000);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
        
        
        );

      }else {
        this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
      }

      
    }
  
  }