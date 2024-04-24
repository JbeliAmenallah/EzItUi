import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee: Employee;
  employeeId: number;
  public chart1: Chart;

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
        this.prepareChartData(); // Generate chart data after fetching employee
      },
      error => {
        console.error('Error fetching employee:', error); // Handle error if any
      }
    );
  }

  prepareChartData(): void {
    // Array of month names
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    // Group absences by month and count the number of absences for each month
    const absencesCountByMonth = this.employee.absences.reduce((acc, absence) => {
      // Parse the date string into a Date object
      const date = new Date(absence.dateDebutAbsence);
      // Get the month and year of the absence
      const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      // Count the number of absences for each month
      acc[monthYear] = acc[monthYear] ? acc[monthYear] + 1 : 1;
      return acc;
    }, {});
  
    // Extract months and absence counts for chart data
    const months = Object.keys(absencesCountByMonth);
    const absencesCounts = Object.values(absencesCountByMonth);
  
    // Create the Highcharts chart configuration
    this.chart1 = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Absences Chart'
      },
      xAxis: {
        categories: months
      },
      yAxis: {
        title: {
          text: 'Number of Absences'
        }
      },
      series: [{
        name: 'Absences',
        type: 'line', // Specify the type of series as 'line'
        data: absencesCounts
      }]
    });
  }
  
  
}
