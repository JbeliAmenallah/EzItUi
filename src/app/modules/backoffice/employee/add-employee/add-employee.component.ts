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
      chefDefamille: false,
      salaireDeBASE: null,
      numCompte: '',
      modeDePaiement: '',
      dateRecrutemnt: null
    };
  }

  save() {
    if (this.employeeForm.form.valid) {
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

      this.service.addEmployee(this.employee).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The employee has been successfully added.' });
          }, 100);
          this.router.navigate(['/employee/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the employee.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}
