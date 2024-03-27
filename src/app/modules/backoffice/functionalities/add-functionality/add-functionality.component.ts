import { Component, OnInit, ViewChild } from '@angular/core'
import { FunctionalityFormComponent } from '../functionality-form/functionality-form.component'
import { Router } from '@angular/router'
import { Functionality } from '../../../../shared/models/functionality'
import { FunctionalityService } from '../../../../core/auth/Functionality.service'
import { Message, MessageService } from 'primeng/api';
import { Project } from '../../../../shared/models/project'
import { ProjectService } from '../../../../core/http/project.service'

@Component({
  selector: 'app-add-functionality',
  templateUrl: './add-functionality.component.html',
  styleUrls: ['./add-functionality.component.css'],
})
export class AddFunctionalityComponent implements OnInit {
  @ViewChild('form') functionalityForm: FunctionalityFormComponent;

  private functionality: Functionality;
  messages: Message[] = [] ;
  currentProject :  Project 
  descriptionCriterion: string[] = []; // Tableau pour stocker les descriptions des critères
  newCriterionDescription: string = ''; // Variable pour stocker la nouvelle description de critère

  constructor(private service: FunctionalityService, private router: Router, 
    private messageService: MessageService ,
    private serviceProject : ProjectService
    ) {}

  ngOnInit(): void {
    this.functionality = {
      functionalityName: '',
      descriptionFunctionality: '',
      priority: 0,
      status: '',
      complexityLevel: '',
      startDate: new Date(),
      endDate: new Date(),
      previousTask: 1,
      nextTask: 2,
      parentTask: '',
      projectId: null,
      project : null,
      duration: 0
    };
  }

  calculateEndDate(): Date {
    const startDate = new Date(this.functionalityForm.form.get('startDate').value);
    const durationInDays = this.functionalityForm.form.get('duration').value;
    const workHoursPerDay = this.functionalityForm.form.get('numberOfHoursWorked').value;
    const workDaysPerWeek = this.functionalityForm.form.get('numberOfDaysWorked').value;

    let remainingDays = durationInDays;
    let endDate = new Date(startDate);
  
    // Ajoutez la durée de travail en jours et heures à la date de début
    endDate.setDate(endDate.getDate() + Math.floor(remainingDays / workHoursPerDay));
  
    // Soustrayez les week-ends du nombre total de jours si la durée dépasse une semaine
    while (remainingDays > workDaysPerWeek) {
      endDate.setDate(endDate.getDate() + 2);
      // Soustrayez 1 jour pour les jours de week-end (samedi et dimanche)
      if (endDate.getDay() === 7 || endDate.getDay() === 0) {
        remainingDays--;
      }
      remainingDays -= workDaysPerWeek;
    }
  
    // Ajoutez le reste des jours à la date finale
    endDate.setDate(endDate.getDate() + remainingDays);
  
    return endDate;
  }
  

  save() {

    if (this.functionalityForm.form.valid) {

    this.functionality.functionalityName = this.functionalityForm.form.get(
      'functionalityName',
    )?.value
    this.functionality.descriptionFunctionality = this.functionalityForm.form.get(
      'descriptionFunctionality',
    )?.value
    this.functionality.priority = parseInt(
      this.functionalityForm.form.get('priority')?.value,
    )
    this.functionality.status = this.functionalityForm.form.get('status')?.value
    this.functionality.complexityLevel = this.functionalityForm.form.get(
      'complexityLevel',
    )?.value
    this.functionality.startDate = this.functionalityForm.form.get('startDate')?.value
    this.functionality.duration =  parseInt(
      this.functionalityForm.form.get('duration')?.value,
    )

    this.functionality.projectId = parseInt(
      this.functionalityForm.form.get('projectId')?.value,
    )
    this.serviceProject.read(this.functionality.projectId).subscribe(
      (project: Project) => {
        this.functionality.project = project;})
         const criteriaTexts = this.functionalityForm.additionalCriteria.map(
        (criterion) => criterion.text
      );

      // Assurez-vous que vous avez récupéré correctement les textes des critères
      console.log('Textes des critères :', criteriaTexts);

    this.service.create(this.functionality).subscribe(
      (data) => {
   

        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The functionality has been successfully added.' });
        }, 100);
        this.router.navigate(['/functionalities']);
      },
      (error) => {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the functionality.' });
        
      }
    );
    }else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    if (this.functionalityForm && this.functionalityForm.form && this.functionalityForm.form.valid) {
      const newFunctionality: Functionality = {
        functionalityName: this.functionalityForm.form.get('functionalityName').value,
        descriptionFunctionality: this.functionalityForm.form.get('descriptionFunctionality').value,
        priority: parseInt(this.functionalityForm.form.get('priority').value),
        status: this.functionalityForm.form.get('status').value,
        complexityLevel: this.functionalityForm.form.get('complexityLevel').value,
        projectId: parseInt(this.functionalityForm.form.get('projectId').value),
        startDate: this.functionalityForm.form.get('startDate').value, 
        endDate: this.calculateEndDate(), 
        duration: this.functionalityForm.form.get('duration').value,
        numberOfDaysWorked: this.functionalityForm.form.get('numberOfDaysWorked').value,
        numberOfHoursWorked: this.functionalityForm.form.get('numberOfHoursWorked').value,
      };
  
      this.service.create(newFunctionality).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The functionality has been successfully added.',
            });
          }, 100);
          this.router.navigate(['/functionalities']);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || 'An error occurred while saving the functionality.',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields.',
      });
    }
  }
}  
}