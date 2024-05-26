import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { EntrepriseService } from '../../../../core/http/entreprise.service';
import { CategoryService } from '../../../../core/http/category.service';
import { GroupeService } from '../../../../core/http/groupe.service';
import { GradeService } from '../../../../core/http/grade.service';

import { SelectItem } from 'primeng/api';
import { isDate } from 'util/types';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Employee;
  entrepriseOptions: any[] = [];
  categoryOptions: any[] = []; 
  groupeOptions:any[] = []; 
  gradeOptions: any[] = [];
 



  regimeOptions: any[] = [
    { label: 'Horaire', value: 'Horaire' },
    { label: 'Mensuel', value: 'Mensuel' }
  ];
  
  chefOptions: any[] = [
    {label: 'Non', value: false},
    {label: 'Oui', value: true}
];
rolesOptions: any[] = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' }
];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private entrepriseService: EntrepriseService,
    private categoryService: CategoryService ,
    private groupeService: GroupeService ,
    private gradeService:GradeService,
  ) { }
  
  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      var da=new Date(this.currentItemForm.dateRecrutemnt);
      console.log(this.currentItemForm.dateRecrutemnt)
      this.form = this.updateForm();
    }
    this.loadEntrepriseOptions();
    this.loadCategories(); 
    this.loadGroupeOptions();
    this.loadGradeOptions();
  }
  
  onChefChange(event: any) {
    const selectedValue = event.value;
    const nbEnfantControl = this.form.get('nbEnfant');
    
    if (selectedValue === false) {
        nbEnfantControl.setValue(0); // Set default value to 0
        nbEnfantControl.disable(); // Disable the field
    } else {
        nbEnfantControl.enable(); // Enable the field
    }
}


  loadEntrepriseOptions() {
    this.entrepriseService.getAllEntreprises().subscribe(
      options => {
        this.entrepriseOptions = options;
      },
      error => {
        console.error('Erreur lors de la récupération des options de l’employé :', error);
      }
    );
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categoryOptions = categories.map(category => ({
          label: category.libele, 
          value: category.category_id 
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    );
  }
  
  loadGroupeOptions() {
    this.groupeService.getAllGroupes().subscribe(
        options => {
            this.groupeOptions = options.map(option => ({
                label: option.libele, 
                value: option.groupe_id 
            }));
        },
        error => {
            console.error('Erreur lors de la récupération des options de groupe :', error);
        }
    );
}
loadGradeOptions() {
  this.gradeService.getAllGrades().subscribe(
    grades => {
      this.gradeOptions = grades.map(grade => ({
        label: grade.libele, 
        value: grade.grade_id 
      }));
    },
    error => {
      console.error('Erreur lors de la récupération des options de grade :', error);
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
      entrepriseId: [null, Validators.compose([Validators.required])],
      category: [null],
      groupe: [null],
      grade: [null]
    });
  }

  updateForm() {
    let date=new Date(this.currentItemForm.dateRecrutemnt)
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
      dateRecrutemnt: [date, Validators.compose([Validators.required])],
      entrepriseId: [this.currentItemForm.entreprise.entrepriseId, Validators.compose([Validators.required])],
      category: [this.currentItemForm.category],
      groupe: [this.currentItemForm.groupe],
      grade: [this.currentItemForm.grade]
 
    });
  }
}
