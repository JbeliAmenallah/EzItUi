import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Entreprise } from '../../../../shared/models/Entreprise';
import { Category } from '../../../../shared/models/category';
import { Grade } from '../../../../shared/models/grade';
import { Groupe } from '../../../../shared/models/groupe';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  @ViewChild('form') employeeForm: EmployeeFormComponent;
  @Input() employee: Employee;
  contactId: any;
  messages: Message[] = [];

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    if (this.route.snapshot.paramMap.get('id') !== undefined) {
      this.contactId = this.route.snapshot.paramMap.get('id');
      this.getEmployee();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.contactId = params['id'];
          this.getEmployee();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
          } else {
            this.router.navigate(['/employees/list']);
          }
        }
      });
    }
  }
  

  ngOnInit(): void {
    this.getEmployee();
  }
  
  getEmployee() {
    this.service.getEmployeeById(this.contactId).subscribe({
      next: (item: Employee) => {
        this.employee = item;
        console.log('Employee:', this.employee); 
  
      
        if (this.employee) {
          const selectedCategoryId = this.employee.category ? this.employee.category.category_id : null;
          this.employeeForm.form.get('category')?.setValue(selectedCategoryId);
  
          const selectedGroupeId = this.employee.groupe ? this.employee.groupe.groupe_id : null;
          this.employeeForm.form.get('groupe')?.setValue(selectedGroupeId);
  
          const selectedGradeId = this.employee.grade ? this.employee.grade.grade_id : null;
          this.employeeForm.form.get('grade')?.setValue(selectedGradeId);
        } else {
          console.error('Employee data is null or undefined.');
        }
      },
      error: (error) => {
        console.error("Une erreur s’est produite lors de l’obtention de l’employé :", error);
        this.goToList();
      }
    });
  }
  goToList() {
    this.router.navigate(['/employee/list']);
  }

  save() {
    console.log("hellol")
    if (this.employeeForm.form.valid) {
      const formValues = this.employeeForm.form.value;

      this.employee.name = this.employeeForm.form.get('name')?.value;
      this.employee.username = this.employeeForm.form.get('username')?.value;
      this.employee.email = this.employeeForm.form.get('email')?.value;
      this.employee.location = this.employeeForm.form.get('location')?.value;
      this.employee.phone = this.employeeForm.form.get('phone')?.value;
      this.employee.fax = this.employeeForm.form.get('fax')?.value;
      this.employee.password = this.employeeForm.form.get('password')?.value;
      this.employee.roles = this.employeeForm.form.get('roles')?.value;
      this.employee.nbEnfant = this.employeeForm.form.get('nbEnfant')?.value;
      this.employee.regime = this.employeeForm.form.get('regime')?.value;
      this.employee.chefDefamille = this.employeeForm.form.get('chefDefamille')?.value;
      this.employee.salaireDeBASE = this.employeeForm.form.get('salaireDeBASE')?.value;
      this.employee.numCompte = this.employeeForm.form.get('numCompte')?.value;
      this.employee.modeDePaiement = this.employeeForm.form.get('modeDePaiement')?.value;
      this.employee.dateRecrutemnt = this.employeeForm.form.get('dateRecrutemnt')?.value;
      this.employee.entreprise = { entrepriseId: formValues.entrepriseId };

const selectedCategoryValue = this.employeeForm.form.get('category')?.value;
const selectedCategory = this.employeeForm.categoryOptions.find(option => option.value === selectedCategoryValue);

if (selectedCategory) {
    this.employee.category = { category_id: selectedCategory.value };
} else {
    console.error('Catégorie sélectionnée introuvable dans les options de catégorie.');
}
const selectedGroupeValue = this.employeeForm.form.get('groupe')?.value;
const selectedGroupe = this.employeeForm.groupeOptions.find(option => option.value === selectedGroupeValue);

if (selectedGroupe) {
    this.employee.groupe = { groupe_id: selectedGroupe.value };
} else {
    console.error('Groupe sélectionné introuvable dans les options de catégorie.');
}
const selectedGradeValue = this.employeeForm.form.get('grade')?.value;
const selectedGrade = this.employeeForm.gradeOptions.find(option => option.value === selectedGradeValue);

if (selectedGrade) {
    this.employee.grade = { grade_id: selectedGrade.value };
} else {
    console.error('Grade sélectionnée introuvable dans les options de catégorie.');
}



      console.log(this.employee)
      this.service.updateEmployee(this.contactId, this.employee).subscribe(
        (data) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’employé a été mis à jour avec succès.', life: 3000 });
          setTimeout(() => {
            this.router.navigate(['/employee/list']);
          }, 100);
        },
        (error) => {
          console.error('Error updating employee:', error);
  
          if (Array.isArray(error)) {
            error.forEach(err => {
              this.messageService.add({ severity: 'error', summary: ' Erreur de validation ', detail: err.message, life: 3000 });
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour de l’employé.', life: 3000 });
          }
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur de validation ', detail: 'Veuillez remplir tous les champs obligatoires.',life:1500});
    }
  }
}
