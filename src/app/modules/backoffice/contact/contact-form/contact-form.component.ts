// project-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Project } from "../../../../shared/models/project";
import { ProjectService } from "../../../../core/http/project.service";
import { Contact } from '../../../../shared/models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Contact; 
  project: any;

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
    this.loadProject();
  }
  loadProject() {
    this.projectService.list().subscribe(
      
    (data) => (this.project= data) )
    
}

  createForm() {
    return this.formBuilder.group({
      firstName: [
        null,
        Validators.compose([Validators.required]),
      ],
      lastName: [
        null,
        Validators.compose([Validators.required]),
      ],
      email: [
        null,
        Validators.compose([Validators.required]),
      ],
      address: [
        null,
        Validators.compose([Validators.required]),
      ],
      phone: [
        null,
        Validators.compose([Validators.required]),
      ],
      projectId: [null, Validators.compose([Validators.required])],
    });
  }

  updateForm() {
    return this.formBuilder.group({
      firstName: [
        this.currentItemForm.firstName,
        Validators.compose([Validators.required]),
      ],
      lastName: [
        this.currentItemForm.lastName,
        Validators.compose([Validators.required]),
      ],
      email: [
        this.currentItemForm.email,
        Validators.compose([Validators.required]),
      ],
      address: [
        this.currentItemForm.address,
        Validators.compose([Validators.required]),
      ],
      phone: [
        this.currentItemForm.phone,
        Validators.compose([Validators.required]),
      ],
      projectId : [
        this.currentItemForm.projectId,
        Validators.compose([Validators.required])
      ]
    });
  }
}
