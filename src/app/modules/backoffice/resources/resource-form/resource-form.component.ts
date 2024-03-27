// resource-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resource } from '../../../../shared/models/resource';
@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Resource;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }
  }

  createForm() {
    console.log("create form");
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
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        null,
        Validators.compose([Validators.required]),
      ],
      address: [
        null,
        Validators.compose([Validators.required]),
      ],
      position: [
        null,
        Validators.compose([Validators.required]),
      ],
      role: [
        null,
        Validators.compose([Validators.required]),
      ],
      hireDate: [
        null,
        Validators.compose([Validators.required]),
      ],
    });
  }

  updateForm() {
    console.log("update form")
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
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        this.currentItemForm.phoneNumber,
        Validators.compose([Validators.required]),
      ],
      address: [
        this.currentItemForm.address,
        Validators.compose([Validators.required]),
      ],

      position: [
        this.currentItemForm.position,
        Validators.compose([Validators.required]),
      ],
      role: [
        this.currentItemForm.role,
        Validators.compose([Validators.required]),
      ],
      hireDate: [
        this.currentItemForm.hireDate,
        Validators.compose([Validators.required]),
      ],
    });
  }

 
}
