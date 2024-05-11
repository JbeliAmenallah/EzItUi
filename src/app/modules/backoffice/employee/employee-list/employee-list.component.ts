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
  employeeCount: any;


  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.fetchEmployee();
  }
  fetchEmployee():void{
    this.employeeService.getAllEmployees().subscribe(
      (employees: Employee[]) => {
        this.employeeCount = employees.length;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
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
      console.error("Employé introuvable dans la liste.");
    }
  }
  
  
  deleteItem(contactId: number) {
    console.log("Deleting employee with contactId:", contactId);
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet employé ?',
      header: 'Confirmation de suppression',
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
              this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'L’employé a été supprimé avec succès' });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression d’un employé' });
            }
          );
        }
        else{console.log(contactId)}
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejecté', detail: 'Vous avez rejeté' });
      }
    });
  }

}
