import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { EntrepriseService } from '../../../../core/http/entreprise.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Employee;
  entrepriseOptions: any[] = [];
  regimeOptions: any[] = [
    { label: 'regime1', value: 'regime1' },
    { label: 'regime2', value: 'regime2' }
  ];
  chefOptions: any[] = [
    {label: 'No', value: false},
    {label: 'Yes', value: true}
];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private entrepriseService: EntrepriseService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
    }
    this.loadEntrepriseOptions();
  }

  loadEntrepriseOptions() {
    this.entrepriseService.getAllEntreprises().subscribe(
      options => {
        this.entrepriseOptions = options;
      },
      error => {
        console.error('Error fetching employee options:', error);
      }
    );
  }

  createForm() {
    return this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      username: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      location: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      fax: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      roles: [null, Validators.compose([Validators.required])],
      nbEnfant: [null, Validators.compose([Validators.required])],
      regime: [null, Validators.compose([Validators.required])],
      chefDefamille: [null, Validators.compose([Validators.required])],
      salaireDeBASE: [null, Validators.compose([Validators.required])],
      numCompte: [null, Validators.compose([Validators.required])],
      modeDePaiement: [null, Validators.compose([Validators.required])],
      dateRecrutemnt: [null, Validators.compose([Validators.required])],
      entrepriseId: [null, Validators.compose([Validators.required])]
    });
  }

  updateForm() {
    return this.formBuilder.group({
      name: [this.currentItemForm.name, Validators.compose([Validators.required])],
      username: [this.currentItemForm.username, Validators.compose([Validators.required])],
      email: [this.currentItemForm.email, Validators.compose([Validators.required, Validators.email])],
      location: [this.currentItemForm.location, Validators.compose([Validators.required])],
      phone: [this.currentItemForm.phone, Validators.compose([Validators.required])],
      fax: [this.currentItemForm.fax, Validators.compose([Validators.required])],
      password: [this.currentItemForm.password, Validators.compose([Validators.required])],
      roles: [this.currentItemForm.roles, Validators.compose([Validators.required])],
      nbEnfant: [this.currentItemForm.nbEnfant, Validators.compose([Validators.required])],
      regime: [this.currentItemForm.regime, Validators.compose([Validators.required])],
      chefDefamille: [this.currentItemForm.chefDefamille || false],
      salaireDeBASE: [this.currentItemForm.salaireDeBASE, Validators.compose([Validators.required])],
      numCompte: [this.currentItemForm.numCompte, Validators.compose([Validators.required])],
      modeDePaiement: [this.currentItemForm.modeDePaiement, Validators.compose([Validators.required])],
      dateRecrutemnt: [this.currentItemForm.dateRecrutemnt, Validators.compose([Validators.required])]
    });
  }
}
