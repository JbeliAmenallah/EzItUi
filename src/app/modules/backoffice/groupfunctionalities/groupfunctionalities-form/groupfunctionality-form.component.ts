import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../../../core/http/project.service';
import { GroupFunctionality } from '../../../../shared/models/groupfunctionality';
import { GroupFunctionalityService } from '../../../../core/http/groupfunctionality.service';

@Component({
  selector: 'app-groupfunctionality-form',
  templateUrl: './groupfunctionality-form.component.html',
  styleUrls: ['./groupfunctionality-form.component.css']
})
export class GroupFunctionalityFormComponent implements OnInit {
  form: FormGroup;
  @Input() currentItemForm: GroupFunctionality;
  projects: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private groupFunctionalityService: GroupFunctionalityService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.list().subscribe(
      (data) => {
        this.projects = data;
      }
    );
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      groupName: [null, Validators.required],
      duration: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      projectId: [0, Validators.required] // Valeur par défaut, vous pouvez ajuster en fonction de votre logique métier
    });
  }
  
  updateForm(): FormGroup {
    return this.formBuilder.group({
      groupName: [this.currentItemForm.groupName, Validators.required],
      duration: [this.currentItemForm.duration, Validators.required],
      startDate: [this.currentItemForm.startDate, Validators.required],
      endDate: [this.currentItemForm.endDate, Validators.required],
      projectId: [this.currentItemForm.projectId, Validators.required]
    });
  }
}
