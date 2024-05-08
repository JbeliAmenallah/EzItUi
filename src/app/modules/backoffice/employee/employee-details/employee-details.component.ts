import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../core/http/employee.service';
import { Chart } from 'angular-highcharts';
import { CongeService } from '../../../../core/http/conge.service';
import { AbsenceService } from '../../../../core/http/absence.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee: Employee;
  employeeId: number;
  public chart1: Chart;
  employeeCount: any;
  employeeCountThisYear: any;
  sinceYearText: string;
  absenceCount: number;
  percentageChange: number;
  changeText: string;
  prevyear: string;
  pendingCongeCount: number;
  employees: Employee[];
  averageBaseSalary:number;
  data: any; // Define data property of type ChartData
  options: any; // Define options property of type ChartOptions



  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private absenceService: AbsenceService, // Instantiate the AbsenceService
    private congeService:CongeService
  ) { }

  ngOnInit(): void {
    this.employeeCountThisYear = this.fetchEmployeeCountThisYear();
    // Generate the text for "Since {current year}" when component initializes
    this.generateSinceYearText();
    this.fetchAbsenceCount();
    this.fetchPendingCongeCount();
    this.fetchAverageBaseSalary();
    this.loadCongesData();
    console.log(this.loadCongesData)
    // Get the employee ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.employeeId = +params.get('id'); // Convert the parameter to a number
      this.fetchEmployee(); // Call the method to fetch the employee
    });

  }
  fetchAverageBaseSalary(): void {
    this.employeeService.getAverageBaseSalary().subscribe(
      (averageBaseSalary: number) => {
        this.averageBaseSalary = averageBaseSalary;
      },
      error => {
        console.error('Error fetching average base salary:', error);
      }
    );
  }

  fetchEmployeeCountThisYear(): void {
    this.employeeService.getEmployeesAddedThisYear().subscribe(
      (count: number) => {
        this.employeeCountThisYear = count;
        console.log(this.employeeCountThisYear)
      },
      error => {
        console.error('Error fetching employee count:', error);
      }
    );
  }
  fetchAbsenceCount(): void {
    forkJoin([
      this.absenceService.countAbsencesByYear(new Date().getFullYear() - 1),
      this.absenceService.countAbsencesByYear(new Date().getFullYear())
    ]).subscribe(
      ([prevYearCount, currYearCount]) => {
        this.absenceCount = currYearCount;
        const diff = currYearCount - prevYearCount;
        if (prevYearCount !== 0) {
          this.percentageChange = Math.round((diff / prevYearCount) * 100);
        } else {
          this.percentageChange = 0; // Handle division by zero
        }
        console.log(this.percentageChange)
        if (diff > 0) {
          this.changeText = `more than last year `;
        } else if (diff < 0) {
          this.changeText = `less than last year `;
        } else {
          this.changeText = 'same as last year';
        }
      },
      error => {
        console.error('Error fetching absence counts:', error);
      }
    );
  }

  calculatePercentageChange(): void {
    const previousYear = new Date().getFullYear() - 1;
    console.log(previousYear)
    this.absenceService.countAbsencesByYear(previousYear).subscribe(
      (previousCount: number) => {
        console.log(previousCount)
        if (previousCount !== 0) {
          this.percentageChange = ((this.absenceCount - previousCount) / previousCount) * 100;
          console.log(this.percentageChange)
        } else {
          this.percentageChange = 0;
        }
      },
      error => {
        console.error('Error fetching absence count for previous year:', error);
      }
    );
  }

  fetchEmployee(): void {
    // Call your service method to fetch the employee based on the ID
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (employee: Employee) => {
        this.employee = employee;
      },
      error => {
        console.error('Error fetching employee:', error); // Handle error if any
      }
    );
    this.employeeService.getAllEmployees().subscribe(
      (employees: Employee[]) => {
        this.employeeCount = employees.length;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  generateSinceYearText(): void {
    const currentYear = new Date().getFullYear();
    this.sinceYearText = ` ${currentYear}`;
    const prevyear = new Date().getFullYear() - 1;
    this.prevyear = `${prevyear}`
  }

  fetchPendingCongeCount(): void {
    this.congeService.getPendingCongeCount().subscribe(
      (count: number) => {
        this.pendingCongeCount = count;
      },
      error => {
        console.error('Error fetching pending congé count:', error);
      }
    );
  }
  loadCongesData(): void {
    this.congeService.getCongesPerMonth().subscribe(
      (congesData: { month: string, year: number, congesCount: number }[]) => {
        const currentYearData = congesData.filter(data => data.year === new Date().getFullYear());
        const previousYearData = congesData.filter(data => data.year === new Date().getFullYear() - 1);
  
        const currentYearMonths = currentYearData.map(data => data.month);
        const currentYearCongesCount = currentYearData.map(data => data.congesCount);
  
        const previousYearMonths = previousYearData.map(data => data.month);
        const previousYearCongesCount = previousYearData.map(data => data.congesCount);
  
        this.data = {
          labels: currentYearMonths,
          datasets: [
            {
              label: `${new Date().getFullYear()} Conges Count`,
              backgroundColor: '#6266F0',
              borderColor: '#6266F0',
              data: currentYearCongesCount
            },
            {
              label: `${new Date().getFullYear() - 1} Conges Count`,
              backgroundColor: '#BCBDF9',
              borderColor: '#BCBDF9',
              data: previousYearCongesCount
            }
          ]
        };
  
        this.options = {
          title: {
            display: true,
            text: 'Conges Count Per Month',
            fontSize: 16
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: true
          }
        };
      },
      error => {
        console.error('Error fetching conges data:', error);
      }
    );
  }
  

}
