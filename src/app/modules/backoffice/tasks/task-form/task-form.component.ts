import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task } from "../../../../shared/models/task"; // Importez votre interface Task
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/http/functionality.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Task; // Utilisez l'interface Task ici
  selectedFunctionalityId : number |null =null ;

  functionalities : Functionality []= [];
  ; 
  constructor(
    private formBuilder: FormBuilder,
    private functionalityService : FunctionalityService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }

    this.functionalityService.list().subscribe(
      (data : any [] )=>{
        this.functionalities = data ;
      }
    )
  }

  createForm() {
    return this.formBuilder.group({
      taskName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
      description: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(1000)]),
      ],
      duration: [
        null,
        Validators.compose([Validators.required]),
      ],
    
   
      functionalityId: [
        null,
        Validators.compose([Validators.required]),
    ],
    });
  }

  updateForm() {
    return this.formBuilder.group({
      taskName: [
        this.currentItemForm.taskName,
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
      description: [
        this.currentItemForm.description,
        Validators.compose([Validators.required, Validators.maxLength(1000)]),
      ],
      duration: [
        this.currentItemForm.duration,
        Validators.compose([Validators.required]),
      ],
  
      functionalityId : [
        this.currentItemForm.functionalityId,
        Validators.compose([Validators.required])
      ]
    });
  }
}
