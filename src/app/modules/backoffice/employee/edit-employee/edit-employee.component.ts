import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

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
            this.employeeForm = extrasState['data'];
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
        console.log(item);
      },
      error: (error) => {
        console.error("An error occurred while getting the employee:", error);
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
      
      this.service.updateEmployee(this.contactId, this.employee).subscribe(
        (data) => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The employee has been successfully updated.' });
          }, 100);
          this.router.navigate(['/employee/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while updating the employee.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }
}