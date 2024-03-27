import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FunctionalityFormComponent } from '../functionality-form/functionality-form.component';
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/http/functionality.service';
import { Message, MessageService } from 'primeng/api';
import { ProjectService } from '../../../../core/http/project.service';
import { Project } from '../../../../shared/models/project';

@Component({
  selector: 'app-edit-functionality',
  templateUrl: './edit-functionality.component.html',
  styleUrls: ['./edit-functionality.component.css']
})
export class EditFunctionalityComponent implements OnInit {

  @ViewChild('form') functionalityForm: FunctionalityFormComponent;
  @Input() functionality: Functionality;
  messages: Message[] = [];
  id: any;

  constructor(
    private service: FunctionalityService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService ,
    private serviceProject : ProjectService


  ) {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getFunctionality();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.id = params['id'];
          this.getFunctionality();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.functionalityForm = extrasState['data'];
          } else {
            this.router.navigate(['/functionalities']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getFunctionality();
  }

  getFunctionality() {
    this.service.read(this.id).subscribe({
      next: (item: Functionality) => {
        this.functionality = item;
        console.log(item);
      },
      error: (error) => {
        console.error("Une erreur s'est produite lors de la lecture de la fonctionnalité :", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/functionalities']);
  }

  save() {
    if (this.functionalityForm.form.valid) {
    this.functionality.functionalityName = this.functionalityForm.form.get('functionalityName')?.value;
    this.functionality.descriptionFunctionality = this.functionalityForm.form.get('descriptionFunctionality')?.value;
    this.functionality.priority = parseInt(this.functionalityForm.form.get('priority')?.value);
    this.functionality.status = this.functionalityForm.form.get('status')?.value;
    this.functionality.complexityLevel = this.functionalityForm.form.get('complexityLevel')?.value ;
    this.functionality.projectId = parseInt(this.functionalityForm.form.get('projectId')?.value);
    this.functionality.startDate = this.functionalityForm.form.get('startDate')?.value
    this.functionality.duration =  parseInt(
      this.functionalityForm.form.get('duration')?.value,
    )

    this.serviceProject.read(this.functionality.projectId).subscribe(
      (project: Project) => {
        this.functionality.project = project;})
    this.service.update(this.functionality).subscribe((data) => {
      setTimeout(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The functionality has been successfully update.' });
      }, 100);
      this.router.navigate(['/functionalities']);
      console.log(this.functionality.project.projectName)
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the functionality.' });

    }
    
    );
  }else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }


  }
}
