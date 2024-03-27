import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bug } from '../../../../shared/models/bug';
import { MessageService } from 'primeng/api';
import { FunctionalityService } from '../../../../core/auth/Functionality.service';
import { BugService } from '../../../../core/auth/bug.service';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit {
  form: FormGroup;
  bugs: Bug[] = [];
  @Input() currentItemForm: Bug;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private serviceFunctionality: FunctionalityService,
    private serviceBug: BugService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }

    this.serviceFunctionality.list().subscribe(
      (data: Bug[]) => {
        this.bugs = data;
        console.log(data);
      }
    );
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      description: [null],
      functionalityCriterionIds: [[], Validators.compose([Validators.required])]
    });
  }

  updateForm() {
    return this.formBuilder.group({
      description: [this.currentItemForm.description],
      functionalityCriterionIds: [this.currentItemForm.functionalityCriterionIds,
        Validators.compose([Validators.required])]
    });
  }
}
