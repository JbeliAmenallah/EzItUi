import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Functionality } from '../../../../shared/models/functionality';
import { ProjectService } from '../../../../core/auth/project.service';
import { Project } from '../../../../shared/models/project';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-functionality-form',
  templateUrl: './functionality-form.component.html',
  styleUrls: ['./functionality-form.component.css']
})
export class FunctionalityFormComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeIndex: number = 0;
  isFormValid: boolean = false;
  dates: Date[] | undefined;
  nbr : number = 0 ;

  form: FormGroup;
  formFunctionalityCriterion :FormGroup ;
  @Input() currentItemForm: Functionality; // Utilisez l'interface Functionality ici
  selectedProjectId : number | null = null;
  projects : Project [] = [] ;
  projectOptions: any[];
complexityOptions = [
  'Easy',
  'Moderate',
  'Complex',
'Very complex',
];
additionalCriteria: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private projectService : ProjectService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
      
    
    } else {
      this.form = this.updateForm();
      this.selectedProjectId = this.currentItemForm.projectId; 
   

    }
    this.form.valueChanges.subscribe(() => {
      this.updateNextButton();
  });

    this.projectService.list().subscribe(
      (data : any [])=>{
        this.projects = data ;
        console.log(data)
        this.projectOptions = data.map(project => ({ label: project.projectName, value: project.id }));

      }
    )
    this.items = [
      {
          label: 'About the functionality',
          command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
      },
      {
          label: 'Add a functionality validation criterion',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label}),
          disabled: !this.isFormValid // Désactivé initialement
        },
  ];
  
  }

  createForm() {
    return this.formBuilder.group({
      functionalityName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
      descriptionFunctionality: [
        null,
        Validators.compose([Validators.required]),
      ],
      priority: [
        null,
        Validators.compose([Validators.required]),
      ],
      status: [
        null,
        Validators.compose([Validators.required]),
      ],
      complexityLevel: [
        null,
        Validators.compose([Validators.required]),
      ],
      startDate: [
        null, 
        Validators.compose([Validators.required]),
      ],
      duration: [
        null,
        Validators.compose([Validators.required]),
      ],
      // numberOfDaysWorked: [
      //   null,
      //   Validators.compose([Validators.required]),
      // ],
      // numberOfHoursWorked: [
      //   null,
      //   Validators.compose([Validators.required]),
      // ],
      projectId: [
        null,
        Validators.compose([Validators.required]),
      ],
      // descriptionCriterion:[
      //   null
      // ]
    });

  }

  updateNextButton(): void {
    this.isFormValid = this.form.valid;
    this.items[1].disabled = !this.isFormValid ;
  }
  updateForm() {
    return this.formBuilder.group({
      functionalityName: [
        this.currentItemForm.functionalityName,
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
      descriptionFunctionality: [
        this.currentItemForm.descriptionFunctionality,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.currentItemForm.priority,
        Validators.compose([Validators.required]),
      ],
      status: [
        this.currentItemForm.status,
        Validators.compose([Validators.required]),
      ],
      complexityLevel: [
        null,
        Validators.compose([Validators.required]),
      ],
      startDate: [
        this.currentItemForm.startDate,
        Validators.compose([Validators.required]),
      ],
      duration: [
        this.currentItemForm.duration,
        Validators.compose([Validators.required]),
      ],
      // numberOfDaysWorked: [
      //   this.currentItemForm.numberOfDaysWorked,
      //   Validators.compose([Validators.required]),
      // ],
      // numberOfHoursWorked: [
      //   this.currentItemForm.numberOfHoursWorked,
      //   Validators.compose([Validators.required]),
      // ],
      projectId: [
        this.currentItemForm.projectId,
        Validators.compose([Validators.required])
      ]
    });
  }
  onActiveIndexChange(event: number) {
    if (event === 1) {
      this.activeIndex = event;
    } else {
      if (this.isFormValid) {
        this.activeIndex = event;
      }
    }
  }
onNextButtonClick(): void {this.activeIndex++;}
onPreviousButtonClick(): void {this.activeIndex--;}
addAnotherCriterion() {this.additionalCriteria.push({});}
removeCriterion(index: number) {
  this.additionalCriteria.splice(index, 1);
}
}
