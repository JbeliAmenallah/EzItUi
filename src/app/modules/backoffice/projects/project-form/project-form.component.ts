import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Project } from "../../../../shared/models/project";
import { ProjectService } from "../../../../core/http/project.service";


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Project;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
  
  ) { }

  ngOnInit(): void {

    
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }
  }

  createForm() {
    return this.formBuilder.group({
      projectName: [
        null,
        Validators.compose([Validators.required]),
      ],
      description: [
        null,
        Validators.compose([Validators.required]),
      ],
      startDate: [
        null,
        Validators.compose([Validators.required]),
      ],
      endDate: [
        null,
        Validators.compose([Validators.required]),
      ],
      estimatedDuration: [
        null,
        Validators.compose([Validators.required]),
      ],
     
    });
  }

  updateForm() {
    console.log("update form")
    return this.formBuilder.group({
      projectName: [
        this.currentItemForm.projectName,
        Validators.compose([Validators.required]),
      ],
      description: [
        this.currentItemForm.description,
        Validators.compose([Validators.required]),
      ],
      startDate: [
        this.currentItemForm.startDate,
        Validators.compose([Validators.required]),
      ],
      endDate: [
        this.currentItemForm.endDate,
        Validators.compose([Validators.required]),
      ],
      estimatedDuration: [
        this.currentItemForm.estimatedDuration,
        Validators.compose([Validators.required]),
      ]
    });
  }




}
