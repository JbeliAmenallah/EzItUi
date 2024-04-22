import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to access route parameters
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee: Employee;
  employeeId: number;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    // Get the employee ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.employeeId = +params.get('id'); // Convert the parameter to a number
      this.fetchEmployee(); // Call the method to fetch the employee
    });
  }

  fetchEmployee(): void {
    // Call your service method to fetch the employee based on the ID
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (employee: Employee) => {
        this.employee = employee;
        console.log(this.employee); // Optionally log the fetched employee
      },
      error => {
        console.error('Error fetching employee:', error); // Handle error if any
      }
    );
  }
}
