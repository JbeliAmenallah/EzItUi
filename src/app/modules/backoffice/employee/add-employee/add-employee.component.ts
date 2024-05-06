import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @ViewChild('form') employeeForm: EmployeeFormComponent;
  private employee: Employee;
  messages: Message[] = [];

  constructor(
    private service: EmployeeService,
    private router: Router,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.employee = {
      name: '',
      username: '',
      email: '',
      location: '',
      phone: '',
      fax: '',
      password: '',
      roles: '',
      nbEnfant: null,
      regime: '',
      chefDefamille: null,
      salaireDeBASE: null,
      numCompte: '',
      modeDePaiement: '',
      dateRecrutemnt: null
    };
  }

  save() {
    if (this.employeeForm.form.valid) {
      // Populate the employee object from the form fields
      this.employee = {
        name: this.employeeForm.form.get('name')?.value,
        username: this.employeeForm.form.get('username')?.value,
        email: this.employeeForm.form.get('email')?.value,
        location: this.employeeForm.form.get('location')?.value,
        phone: this.employeeForm.form.get('phone')?.value,
        fax: this.employeeForm.form.get('fax')?.value,
        password: this.employeeForm.form.get('password')?.value,
        roles: this.employeeForm.form.get('roles')?.value,
        nbEnfant: this.employeeForm.form.get('nbEnfant')?.value,
        regime: this.employeeForm.form.get('regime')?.value,
        chefDefamille: this.employeeForm.form.get('chefDefamille')?.value,
        salaireDeBASE: this.employeeForm.form.get('salaireDeBASE')?.value,
        numCompte: this.employeeForm.form.get('numCompte')?.value,
        modeDePaiement: this.employeeForm.form.get('modeDePaiement')?.value,
        dateRecrutemnt: this.employeeForm.form.get('dateRecrutemnt')?.value,
        entreprise: { entrepriseId: this.employeeForm.form.get('entrepriseId')?.value } 
      };
      console.log(this.employee)
      this.service.addEmployee(this.employee).subscribe(
        () => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'L’employée a été ajoutée avec succès.' });
            setTimeout(() => {
                this.router.navigate(['/employee/list']);
            }, 1000); 
        }, 10);
        },
        (error) => {
          let errorMessage = 'Une erreur s’est produite lors de l’enregistrement de l’employé.';
          if (error && error.error && error.error.message) {
            errorMessage = error.error.message; 
          }
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: errorMessage });
        }
      );
    }  else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La forme n’est pas valable.' });
    }
  }
}