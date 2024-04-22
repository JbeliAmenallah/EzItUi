import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[];
  loading: boolean = false;
  selectedEmployee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.employeeService.getAllEmployees().subscribe(
      (items: Employee[]) => {
        this.employees = items.reverse();
      }
    );
  }

  editItem(item: Employee): void {
    console.log(item);
    this.router.navigate(['/employee/edit/' + item.contactId], {
      state: { data: item },
      
    });

  }

  openDetails(employee: Employee): void {
    // Find the employee by ID from the list of employees
    const selectedEmployee = this.employees.find(emp => emp.contactId === employee.contactId);
    console.log("Selected Employee:", selectedEmployee); // Log selected employee
    if (selectedEmployee) {
      this.selectedEmployee = selectedEmployee;
      this.router.navigate(['/employee/details/', selectedEmployee.contactId], {
        state: { data: selectedEmployee }
      });
    } else {
      console.error("Employee not found in the list.");
    }
  }
  
  
  deleteItem(contactId: number) {
    console.log("Deleting employee with contactId:", contactId);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this employee?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: () => {
        if (contactId !== undefined) {
          this.employeeService.deleteEmployee(contactId).subscribe(
            () => {
              this.getList();
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Employee deleted successfully' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting employee' });
            }
          );
        }
        else{console.log(contactId)}
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

}
