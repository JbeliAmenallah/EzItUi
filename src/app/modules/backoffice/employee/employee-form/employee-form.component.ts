import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Employee; // Change this to match your component's input
  // Add other necessary variables here

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService // Update this to your Employee service
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }
    // Other initialization logic if needed
  }

  createForm() {
    return this.formBuilder.group({
      name: [
        null,
        Validators.compose([Validators.required]),
      ],
      username: [
        null,
        Validators.compose([Validators.required]),
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      location: [
        null,
        Validators.compose([Validators.required]),
      ],
      phone: [
        null,
        Validators.compose([Validators.required]),
      ],
      fax: [
        null,
        Validators.compose([Validators.required]),
      ],
      password: [
        null,
        Validators.compose([Validators.required]),
      ],
      roles: [
        null,
        Validators.compose([Validators.required]),
      ],
      nbEnfant: [
        null,
        Validators.compose([Validators.required]),
      ],
      regime: [
        null,
        Validators.compose([Validators.required]),
      ],
      chefDefamille: [false],
      salaireDeBASE: [
        null,
        Validators.compose([Validators.required]),
      ],
      numCompte: [
        null,
        Validators.compose([Validators.required]),
      ],
      modeDePaiement: [
        null,
        Validators.compose([Validators.required]),
      ],
      dateRecrutemnt: [
        null,
        Validators.compose([Validators.required]),
      ],
    });
  }

  updateForm() {
    return this.formBuilder.group({
      name: [
        this.currentItemForm.name,
        Validators.compose([Validators.required]),
      ],
      username: [
        this.currentItemForm.username,
        Validators.compose([Validators.required]),
      ],
      email: [
        this.currentItemForm.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      location: [
        this.currentItemForm.location,
        Validators.compose([Validators.required]),
      ],
      phone: [
        this.currentItemForm.phone,
        Validators.compose([Validators.required]),
      ],
      fax: [
        this.currentItemForm.fax,
        Validators.compose([Validators.required]),
      ],
      password: [
        this.currentItemForm.password,
        Validators.compose([Validators.required]),
      ],
      roles: [
        this.currentItemForm.roles,
        Validators.compose([Validators.required]),
      ],
      nbEnfant: [
        this.currentItemForm.nbEnfant,
        Validators.compose([Validators.required]),
      ],
      regime: [
        this.currentItemForm.regime,
        Validators.compose([Validators.required]),
      ],
      chefDefamille: [
        this.currentItemForm.chefDefamille || false,
      ],
      salaireDeBASE: [
        this.currentItemForm.salaireDeBASE,
        Validators.compose([Validators.required]),
      ],
      numCompte: [
        this.currentItemForm.numCompte,
        Validators.compose([Validators.required]),
      ],
      modeDePaiement: [
        this.currentItemForm.modeDePaiement,
        Validators.compose([Validators.required]),
      ],
      dateRecrutemnt: [
        this.currentItemForm.dateRecrutemnt,
        Validators.compose([Validators.required]),
      ],
    });
  }
}
